/* eslint-disable @typescript-eslint/no-explicit-any */

import { orderModel } from '../order/order.model.js';
import { PAYMENT_STATUS } from '../payment/payment.interface.js';
import { paymentModel } from '../payment/payment.model.js';
import { productModel } from '../product/product.model.js';
import { IsActive } from '../user/user.interface.js';
import { userModel } from '../user/user.model.js';

const now = new Date();
const threDaysAgo = new Date(now).setDate(now.getDate() - 3);
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);

const getUserStats = async () => {
  const totalUsersPromise = userModel.countDocuments();

  const totalActiveUsersPromise = userModel.countDocuments({
    isActive: IsActive.ACTIVE,
  });
  const totalInActiveUsersPromise = userModel.countDocuments({
    isActive: IsActive.INACTIVE,
  });
  const totalBlockedUsersPromise = userModel.countDocuments({
    isActive: IsActive.BLOCKED,
  });

  const newUsersInLast7DaysPromise = userModel.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });
  const newUsersInLast30DaysPromise = userModel.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });

  const usersByRolePromise = userModel.aggregate([
    //stage -1 : Grouping users by role and count total users in each role

    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
      },
    },
  ]);

  const [
    totalUsers,
    totalActiveUsers,
    totalInActiveUsers,
    totalBlockedUsers,
    newUsersInLast7Days,
    newUsersInLast30Days,
    usersByRole,
  ] = await Promise.all([
    totalUsersPromise,
    totalActiveUsersPromise,
    totalInActiveUsersPromise,
    totalBlockedUsersPromise,
    newUsersInLast7DaysPromise,
    newUsersInLast30DaysPromise,
    usersByRolePromise,
  ]);
  return {
    totalUsers,
    totalActiveUsers,
    totalInActiveUsers,
    totalBlockedUsers,
    newUsersInLast7Days,
    newUsersInLast30Days,
    usersByRole,
  };
};

const getProductStats = async () => {
  const totalProductsPromise = productModel.countDocuments();
  const totalProductsByCategoryPromise = productModel.aggregate([
    // stage-1 : connect Tour Type model - lookup stage
    {
      $lookup: {
        from: 'categories',
        localField: 'category', //product interface ba type er modhe ki name raksi
        foreignField: '_id', //ki dea connect karai
        as: 'categoryCount', // new name a add hoibo
      },
    },
    //stage - 2 : unwind the array to object

    {
      $unwind: '$categoryCount',
    },

    // //stage - 3 : grouping tour type
    {
      $group: {
        _id: '$categoryCount.categoryName',
        count: { $sum: 1 },
      },
    },
  ]);

  const productCostPromise = productModel.aggregate([
    //Stage-1 : group the cost from, do sum, and average the sum
    {
      $group: {
        _id: null,
        totalProductCost: { $sum: '$mrpPrice' },
      },
    },
  ]);

  const totalHighestOrderProductPromise = orderModel.aggregate([
    // Unwind products array
    {
      $unwind: '$products',
    },

    // Group by product
    {
      $group: {
        _id: '$products.productRef',
        totalSold: {
          $sum: '$products.quantity',
        },
        totalOrders: {
          $sum: 1,
        },
        revenue: {
          $sum: {
            $multiply: ['$products.quantity', '$products.price'],
          },
        },
      },
    },

    // Sort by highest sold quantity
    {
      $sort: {
        totalSold: -1,
      },
    },

    // Top 5
    {
      $limit: 5,
    },

    // Lookup product details
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },

    // Convert array to object
    {
      $unwind: '$product',
    },

    // Project required fields
    {
      $project: {
        _id: 0,
        productId: '$product._id',
        name: '$product.title',
        slug: '$product.slug',
        image: '$product.thumbnail',
        totalSold: 1,
        totalOrders: 1,
        revenue: 1,
      },
    },
  ]);

  const [
    totalProducts,
    totalProductsByCategory,
    productCost,
    totalHighestOrderProduct,
  ] = await Promise.all([
    totalProductsPromise,
    totalProductsByCategoryPromise,
    productCostPromise,
    totalHighestOrderProductPromise,
  ]);

  return {
    totalProducts,
    totalProductsByCategory,
    productCost,
    totalHighestOrderProduct,
  };
};

const getOrderStats = async () => {
  const totalOrderPromise = orderModel.countDocuments();

  const totalOrderByCategoryPromise = orderModel.aggregate([
    // Unwind products array
    {
      $unwind: '$products',
    },

    // Count orders per product
    {
      $group: {
        _id: '$products.productRef',
        count: { $sum: 1 },
      },
    },

    // Lookup product
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },

    // Lookup category
    {
      $lookup: {
        from: 'categories',
        localField: 'product.category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },

    // Group by category
    {
      $group: {
        _id: '$category._id',
        categoryName: { $first: '$category.categoryName' },
        totalOrders: { $sum: '$count' },
      },
    },

    {
      $project: {
        _id: 0,
        categoryId: '$_id',
        categoryName: 1,
        totalOrders: 1,
      },
    },
  ]);

  const orderPerProductPromise = orderModel.aggregate([
    // Unwind products array
    {
      $unwind: '$products',
    },

    // Count orders per product
    {
      $group: {
        _id: '$products.productRef',
        orderCount: { $sum: 1 },
      },
    },

    // Sort by most ordered
    {
      $sort: {
        orderCount: -1,
      },
    },

    // Top 10
    {
      $limit: 10,
    },

    // Lookup product
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },

    // Convert array to object
    {
      $unwind: '$product',
    },

    // Final output
    {
      $project: {
        _id: 0,
        productId: '$product._id',
        title: '$product.title',
        slug: '$product.slug',
        thumbnailImage: '$product.thumbnailImage',
        price: '$product.price',
        orderCount: 1,
      },
    },
  ]);

  const orderTodayPromise = orderModel.countDocuments({
    createdAt: { $gte: now },
  });
  const orderLast3DaysPromise = orderModel.countDocuments({
    createdAt: { $gte: threDaysAgo },
  });
  const orderLast7DaysPromise = orderModel.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });
  const orderLast30DaysPromise = orderModel.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });


 const orderChartPromise = orderModel.aggregate([
  {
    $match: {
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 6)),
      },
      // Optional: Only count paid orders
      // paymentStatus: "PAID",
    },
  },
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt",
        },
      },
      orders: {
        $sum: 1,
      },
      revenue: {
        $sum: "$totalPrice",
      },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
]);

const orderStatusPromise = orderModel.aggregate([
  {
    $group: {
      _id: "$status",
      orders: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
]);


  // const totalBookingByUniqueUsersPromise = bookingModel.distinct("user").then((user: any) => user.length)

const [
  totalOrder,
  totalOrderByCategory,
  orderPerProduct,
  orderToday,
  orderLast3Days,
  orderLast7Days,
  orderLast30Days,
  orderChart,
  orderStatus
] = await Promise.all([
  totalOrderPromise,
  totalOrderByCategoryPromise,
  orderPerProductPromise,
  orderTodayPromise,
  orderLast3DaysPromise,
  orderLast7DaysPromise,
  orderLast30DaysPromise,
  orderChartPromise,
  orderStatusPromise
]);

  return {
    totalOrder,
    totalOrderByCategory,
    orderPerProduct,
    orderToday,
    orderLast3Days,
    orderLast7Days,
    orderLast30Days,
    orderChart,
    orderStatus
  };
};

const getPaymentStats = async () => {

    const totalPaymentPromise = paymentModel.countDocuments();

    const totalPaymentByStatusPromise = paymentModel.aggregate([
        //stage 1 group
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ])

    const totalRevenuePromise = paymentModel.aggregate([
        //stage1 match stage
        {
            $match: { status: PAYMENT_STATUS.PAID }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$amount" }
            }
        }
    ])

    const avgPaymentAmountPromise = paymentModel.aggregate([
        //stage 1 group stage
        {
            $group: {
                _id: null,
                avgPaymentAMount: { $avg: "$amount" }
            }
        }
    ])

    const paymentGatewayDataPromise = paymentModel.aggregate([
        //stage 1 group stage
        {
            $group: {
                _id: { $ifNull: ["$paymentGatewayData.status", "UNKNOWN"] },
                count: { $sum: 1 }
            }
        }
    ])

    const [totalPayment, totalPaymentByStatus, totalRevenue, avgPaymentAmount, paymentGatewayData] = await Promise.all([
        totalPaymentPromise,
        totalPaymentByStatusPromise,
        totalRevenuePromise,
        avgPaymentAmountPromise,
        paymentGatewayDataPromise

    ])
    return { totalPayment, totalPaymentByStatus, totalRevenue, avgPaymentAmount, paymentGatewayData }
}


const getDashboardStats = async () => {
  const [
    totalRevenue,
    totalOrders,
    totalProducts,
    totalUsers,
  ] = await Promise.all([
    paymentModel.aggregate([
      {
        $match: {
          status: PAYMENT_STATUS.PAID,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]),
    orderModel.countDocuments(),
    productModel.countDocuments(),
    userModel.countDocuments(),
  ]);

  return {
    totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    totalOrders,
    totalProducts,
    totalUsers,
  };
};

export const StatsService = {
  getOrderStats,
  getPaymentStats,
  getProductStats,
  getUserStats,
  getDashboardStats 
};
