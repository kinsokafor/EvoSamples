import { defineStore } from "pinia";
import { dbTable, normalize, parseMeta } from "@/helpers";
import _ from "lodash";

export const useSampleStore = defineStore("useSampleStore", {
  state: () => {
    return {
      data: new Map(),
      dbtable: new dbTable(),
      lastTimeOut: null,
    };
  },
  actions: {
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
      return await this.dbtable
        .get("tableName", {
          limit,
          offset,
          order,
          order_by,
          ...params,
        })
        .then((r) => {
          if (Array.isArray(r.data)) {
            const result = r.data.map((i) => parseMeta(i));
            this.data.set(key, result);
            // setTimeout(() => this.data.delete(key), validity)
            return result;
          } else {
            this.data.set(key, r.data);
            // setTimeout(() => this.data.delete(key), validity)
            return r.data;
          }
        });
    },

    abort() {
      this.dbtable.abort();
    },
  },
  getters: {
    get: (state) => {
      const data = state.data;
      return function (
        params = {},
        page = 1,
        limit = 50,
        order = "ASC",
        order_by = "id",
        validity = 36000
      ) {
        const offset = page * limit - limit;
        const key = normalize({ ...params, limit, offset, order, order_by });
        if (data.has(key)) {
          return Promise.resolve(state.data.get(key));
        }
        return state.load(params, page, limit, order, order_by, validity);
      };
    },
  },
});
