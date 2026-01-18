import { defineStore } from "pinia";
import { Request, normalize, parseMeta } from "@/helpers";

export const useSampleStore = defineStore("useSampleStore", {
  state: () => ({
    data: new Map(),
    anchor: new Request(),
    timeOuts: new Map(),
    loading: false,
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
      for (var k in params) {
        //return when all data are not ready
        if (params[k] == null) delete params[k];
      }

      const offset = page * limit - limit;
      const key = normalize({ ...params, limit, offset, order, order_by });
      this.loading = true

      await this.anchor.get(this.anchor.root + "/endpoint", {
        limit,
        offset,
        order,
        order_by,
        ...params,
      }).then(result => {
        if(result.status !== 200) return;

        let final;
        if (Array.isArray(result.data)) {
          final = Object.values(result.data).map((r) => parseMeta(r));
        } else {
          final = result.data;
        }

        this._setCache(key, final, validity);

        return final;
      }).finally(() => {
        this.loading = false
      });

      
    },

    abort() {
      this.anchor.abort();
    },
  },

  getters: {
    get: (state) => {
      const data = state.data;
      return (
        params = {},
        page = 1,
        limit = 50,
        order = "ASC",
        order_by = "id",
        validity = 36000
      ) => {
        const offset = page * limit - limit;
        const key = normalize({ ...params, limit, offset, order, order_by });

        if (data.has(key)) {
          return data.get(key);
        }

        state.load(params, page, limit, order, order_by, validity);
      };
    },
  },
});
