import { defineStore } from "pinia";
import { dbTable, normalize, parseMeta } from "@/helpers";

export const useSampleStore = defineStore("useSampleStore", {
  state: () => ({
    data: new Map(),
    dbtable: new dbTable(),
    timeOuts: new Map(),
  }),

  actions: {
    _setCache(key, value, validity) {
      // Clear old timeout (if exists)
      if (this.timeOuts.has(key)) {
        clearTimeout(this.timeOuts.get(key));
        this.timeOuts.delete(key);
      }

      // Save new cache
      this.data.set(key, value);

      // Start new timeout
      const timeout = setTimeout(() => {
        this.data.delete(key);
        this.timeOuts.delete(key);
      }, validity);

      this.timeOuts.set(key, timeout);
    },

    async load(
      params = {},
      page = 1,
      limit = 50,
      order = "ASC",
      order_by = "id",
      validity = 36000
    ) {
      const offset = page * limit - limit;
      const key = normalize({ ...params, limit, offset, order, order_by });

      const result = await this.dbtable.get("tableName", {
        limit,
        offset,
        order,
        order_by,
        ...params,
      });

      let final;
      if (Array.isArray(result.data)) {
        final = result.data.map(parseMeta);
      } else {
        final = result.data;
      }

      this._setCache(key, final, validity);

      return final;
    },

    abort() {
      this.dbtable.abort();
    },
  },

  getters: {
    get:
      (state) =>
      (
        params = {},
        page = 1,
        limit = 50,
        order = "ASC",
        order_by = "id",
        validity = 36000
      ) => {
        const offset = page * limit - limit;
        const key = normalize({ ...params, limit, offset, order, order_by });

        if (state.data.has(key)) {
          return Promise.resolve(state.data.get(key));
        }

        return state.load(params, page, limit, order, order_by, validity);
      },
  },
});
