<template>
    <h4>Title</h4>
    <div class="card mb-4">
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <label for="field1">Status</label>
                    <select class="form-control" id="field1" v-model="query.status">
                        <option v-for="status in statusOptions" :key="status" :value="status">
                            {{ status }}
                        </option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="fullname">Search</label>
                    <div class="name-search-filter">
                        <input type="search" class="form-control flex-2" id="fullname" placeholder="Search..."
                            v-model="query.search" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <Filter v-bind="filterProps" :loading="store.loading"
                @setPage="setPage" @setLimit="setLimit" v-slot="{ outputData }">
                {{ outputData }}
            </Filter>
        </div>
    </div>
</template>

<script setup>
import { useSampleStore } from '@module/sample'
import { computed, ref, watch, onMounted } from 'vue'
import { useStore } from '@/helpers';

const store = useSampleStore()

const statusOptions = ["active", "inactive", "deleted"]

const query = ref({})

const count = ref(0)

onMounted(() => {
    query.value.status = "active"
})

const config = computed(() => ({
    query: { 
        order_by: "surname,middle_name,other_names",
        searchin: "surname,middle_name,other_names,email,username", 
        ...query.value 
    },
    orderBy: "surname,middle_name,other_names",
    order: "desc"
}))

const { Filter, setPage, setLimit, filterProps, updateInCache, getSerialNumber } = useStore(store, config)

</script>

<style lang="scss" scoped></style>