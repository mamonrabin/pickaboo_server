/* eslint-disable no-useless-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Query } from 'mongoose';
import { excludeField } from '../constants.js';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, string>;

  private filterQuery: Record<string, any> = {};

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // ---------------- FILTER ----------------
  filter(): this {
    const filter = { ...this.query };

    excludeField.forEach((field) => delete filter[field]);

    Object.keys(filter).forEach((key) => {
      if (
        filter[key] === '' ||
        filter[key] === undefined ||
        filter[key] === null
      ) {
        delete filter[key];
      }
    });

    const itemFilter: Record<string, any> = {};

    // CATEGORY
    if (filter.category) {
      itemFilter.category = new mongoose.Types.ObjectId(filter.category);
      delete filter.category;
    }

    // SUB CATEGORY
    if (filter.subCategory) {
      itemFilter.subCategory = new mongoose.Types.ObjectId(filter.subCategory);
      delete filter.subCategory;
    }

    // BRAND
    if (filter.brand) {
      itemFilter.brand = new mongoose.Types.ObjectId(filter.brand);
      delete filter.brand;
    }

    // COLORS
    if (filter.color) {
      itemFilter.colors = {
        $in: filter.color
          .split(',')
          .map((id) => new mongoose.Types.ObjectId(id)),
      };

      delete filter.color;
    }

    // SIZES
    if (filter.size) {
      itemFilter.sizes = {
        $in: filter.size
          .split(',')
          .map((id) => new mongoose.Types.ObjectId(id)),
      };

      delete filter.size;
    }

    // STOCK STATUS
    if (filter.stock_status) {
      itemFilter.stock_status = filter.stock_status;
      delete filter.stock_status;
    }

    // LABELS
    if (filter.labels) {
      itemFilter.labels = filter.labels;
      delete filter.labels;
    }

    // PRICE RANGE
    if (filter.minPrice || filter.maxPrice) {
      itemFilter.price = {};

      if (filter.minPrice) {
        itemFilter.price.$gte = Number(filter.minPrice);
      }

      if (filter.maxPrice) {
        itemFilter.price.$lte = Number(filter.maxPrice);
      }

      delete filter.minPrice;
      delete filter.maxPrice;
    }

    this.filterQuery = {
      ...this.filterQuery,
      ...itemFilter,
      ...filter,
    };

    return this;
  }

  // ---------------- SEARCH ----------------
  search(searchableFields: string[]): this {
    const searchTerm = this.query.searchTerm?.trim();

    if (!searchTerm) return this;

    this.filterQuery.$or = searchableFields.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    }));

    return this;
  }

  // ---------------- SORT ----------------
  //   sort(): this {
  //     const sort = this.query.sort || "-createdAt";

  //     this.modelQuery = this.modelQuery.sort(sort);

  //     return this;
  //   }

  sort(): this {
    const sortBy = this.query.sort;

    let sortField = 'createdAt';
    let sortOrder: 1 | -1 = -1;

    switch (sortBy) {
      case 'a-z':
        sortField = 'title';
        sortOrder = 1;
        break;

      case 'z-a':
        sortField = 'title';
        sortOrder = -1;
        break;

      case 'priceLowToHigh':
        sortField = 'price';
        sortOrder = 1;
        break;

      case 'priceHighToLow':
        sortField = 'price';
        sortOrder = -1;
        break;

      case 'dateOldToNew':
        sortField = 'createdAt';
        sortOrder = 1;
        break;

      case 'dateNewToOld':
      default:
        sortField = 'createdAt';
        sortOrder = -1;
        break;
    }

    this.modelQuery = this.modelQuery.sort({
      [sortField]: sortOrder,
    });

    return this;
  }

  // ---------------- FIELDS ----------------
  fields(): this {
    const fields = this.query.fields?.split(',').join(' ') || '';

    if (fields) {
      this.modelQuery = this.modelQuery.select(fields);
    }

    return this;
  }

  // ---------------- PAGINATION ----------------
  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;

    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // ---------------- APPLY ----------------
  apply(): this {
    this.modelQuery = this.modelQuery.find(this.filterQuery);

    return this;
  }

  // ---------------- BUILD ----------------
  build() {
    return this.modelQuery;
  }

  // ---------------- META ----------------
  async getMeta() {
    const totalDocuments = await this.modelQuery.model.countDocuments(
      this.filterQuery,
    );

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;

    return {
      page,
      limit,
      total: totalDocuments,
      totalPage: Math.ceil(totalDocuments / limit),
    };
  }
}
