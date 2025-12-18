<template>
    <layout>
        <h4>Title</h4>
        <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                    <!-- <div class="col-md-4">
                        <label for="field1">Label 1</label>
                        <select class="form-control" id="field1" v-model="query.field1">
                            <option v-for="field1 in []" :key="field1" :value="field1">
                                {{ field1 }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="field2">Label 2</label>
                        <select class="form-control" id="field2" v-model="query.field2">
                            <option v-for="field2 in []" :key="field2" :value="field2">
                                {{ field2 }}
                            </option>
                        </select>
                    </div> -->
                    <div class="col-md-4">
                        <label for="fullname">Search name</label>
                        <div class="d-flex name-search-filter input-group">
                            <input type="text" class="form-control flex-2" id="fullname" placeholder="Search..." v-model="fullname"/>
                            <div class="input-group-append">
                                <button 
                                    class="btn btn-primary flex-1" 
                                    @click.prevent="query.fullname = fullname">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <Filter 
                    :data="data"
                    :page-array="pageArray"
                    :count="count"
                    :page="page"
                    @setPage="setPage"
                    @setLimit="setLimit"
                    v-slot="{outputData}">
                    {{outputData}}
                </Filter>
            </div>
        </div>
    </layout>
</template>

<script setup>
import { useStudentsStore } from '@module/eEdu/store/BigData/students'
import { computed, ref, watch } from 'vue'
import { useBigStore, Request } from '@/helpers';
import Filter from "@filter/BigStoreFilter.vue";

const store = useStudentsStore()
const fullname = ref(null)


const query = ref({})

const count = ref(0)

const config = computed(() => ({
    query: query.value,
    count: count.value
}))

watch(query, () => getCount(), {deep: true})

const {data, pageArray, setPage, setLimit, pageCount, page} = useBigStore(store, config)

async function getCount()
{
    const params = query.value;
    for (var k in params) {
        if (params[k] == null) delete params[k]
    }
    const req = new Request;
    const res = await req.get(req.root+"/endpoint", {...params});
    count.value = res.data;
}

</script>

<style lang="scss" scoped>
    
</style>