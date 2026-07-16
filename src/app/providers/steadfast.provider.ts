import { steadfastApi } from "../config/steadfast.config.js";
import AppError from "../helpers/AppError.js";
import { orderModel } from "../modules/order/order.model.js";

export const createParcel = async (orderId: string) => {
  const order = await orderModel.findById(orderId);

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  if (order.paymentMethod !== "COD") {
    throw new AppError(400, "Only COD orders can be sent to Steadfast");
  }

  // Prevent duplicate parcel creation
  if (
    order.courier?.provider === "STEADFAST" &&
    order.courier?.consignmentId
  ) {
    throw new AppError(400, "Parcel already created");
  }

  const payload = {
    invoice: order.orderId,
    recipient_name: order.shippingAddress.name,
    recipient_phone: order.shippingAddress.phone,
    recipient_address: `${order.shippingAddress.address}, ${order.shippingAddress.thana ?? ""}, ${order.shippingAddress.city}`,
    cod_amount: order.totalPrice,
    note: order.note ?? "",
    item_description: `${order.products.length} Product`,
  };

  const { data } = await steadfastApi.post("/create_order", payload);

  return data;
};

export const trackParcel = async (consignmentId: string) => {
  if (!consignmentId) {
    throw new AppError(400, "Consignment ID is required");
  }

  const { data } = await steadfastApi.get(
    `/status_by_cid/${consignmentId}`
  );

  return data;
};

export const getBalance = async () => {
  const { data } = await steadfastApi.get("/get_balance");

  return data;
};