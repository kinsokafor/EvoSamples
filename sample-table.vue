<template>
    <div>
        <Table 
            @disableUser="disable" 
            @enableUser="enable" 
            @deleteUser="deleteUser" 
            :columns="columns" 
            :serial-number="filterStore.getSerialNumber" 
            :actions="actions" 
            :data="users"
            :processing="usersStore.processing"
        ></Table>
    </div>
</template>

<script setup>
import Table from '@/components/Table.vue';

const columns = {
    fullname: "Fullname",
    email: "Email",
    phone: "Phone Number",
    role_name: "Role",
    profile_display: "Photo"
}

const actions = [
        {
            name: "Profile",
            type: "router-link",
            url: "/profile/{id}",
            access: [1,2],
            params: "id"
        },
        {
            name: "Profile2",
            type: "link",
            url: "/profile?id={id}",
            params: ["id"],
            notConditions: {
                email: "info@swiftwaylog.com"
            }
        },
        {
            name: "Disable",
            type: "action",
            callback: "disableUser",
            conditions: {
                status: "active"
            }
        },
        {
            name: "Enable",
            type: "action",
            callback: "enableUser",
            conditions: {
                status: "inactive"
            }
        },
        {
            name: "Delete",
            type: "action",
            callback: "deleteUser",
            conditions: {
                status: "inactive"
            }
        }
    ]

    function disable(row, index) {
        
    }
</script>

<style lang="scss" scoped>

</style>