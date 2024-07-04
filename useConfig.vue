<template>
    <div>
        {{ loginPage }}
    </div>
</template>

<script setup>
    import {computed} from 'vue'
    import {useConfigStore} from '@store/config'

    const config = useConfigStore()
    
    const loginPage = computed(() =>  config.get("links.login"))
</script>

<style lang="scss" scoped>

</style>