/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from "mongoose";
import { excludeField } from "../constants.js";

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

        for (const field of excludeField) {
            delete filter[field];
        }

        // remove empty values (IMPORTANT FIX)
        Object.keys(filter).forEach((key) => {
            if (filter[key] === "" || filter[key] === undefined) {
                delete filter[key];
            }
        });

        this.filterQuery = {
            ...this.filterQuery,
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
                $options: "i",
            },
        }));

        return this;
    }

    // ---------------- SORT ----------------
    sort(): this {
        const sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }

    // ---------------- FIELDS ----------------
    fields(): this {
        const fields =
            this.query.fields?.split(",").join(" ") || "";

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

    // ---------------- APPLY FILTER (IMPORTANT) ----------------
    apply(): this {
        this.modelQuery = this.modelQuery.find(this.filterQuery);
        return this;
    }

    // ---------------- EXECUTE ----------------
    build() {
        return this.modelQuery;
    }

    // ---------------- META ----------------
    async getMeta() {
        const totalDocuments = await this.modelQuery.model.countDocuments(
            this.filterQuery
        );

        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;

        const totalPage = Math.ceil(totalDocuments / limit);

        return {
            page,
            limit,
            total: totalDocuments,
            totalPage,
        };
    }
}