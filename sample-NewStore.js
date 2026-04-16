import { defineStore } from "pinia";
import { Request, parseMeta } from "@/helpers";
import { reactive } from "vue";

export const useSampleStore = defineStore("useSampleStore", {
    state: () => ({
        data: reactive(new Map()),
        anchor: new Request(),
        timeOuts: reactive(new Map()),
        loading: false,
        countLoading: false,
        count: reactive(new Map())
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
            key = {},
            offset = 0,
            limit = 50,
            order = "ASC",
            order_by = "id",
            validity = 360000
        ) {

            this.loading = true

            await this.anchor.get(this.anchor.root + "/endpoint", {
                limit,
                offset,
                order,
                order_by,
                ...params,
            }).then(result => {
                if (result.status !== 200) return;

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

        async loadCount(params, key) {
            params = {...params, is_count: 1}

            this.countLoading = true

            await this.anchor.get(this.anchor.root + "/endpoint", params).then(result => {
                if (result.status !== 200) return;

                if(typeof result.data !== "number")
                {
                    throw new Error(`Response from count method must be an integer number but ${typeof result.data} type was returned.`)
                }

                this.count.set(key, result.data);

                return result.data;
            }).finally(() => {
                this.countLoading = false
            });
        }

    },

    getters: {

    },
});
