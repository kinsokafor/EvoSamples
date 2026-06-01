<template>
    <div
        class="file-item"
        @contextmenu="showMenu"
    >
        Right-click me
    </div>

    <ContextMenu ref="menu">
        <div class="menu-item">Rename</div>
        <div class="menu-item">Copy</div>
        <div class="menu-item">Delete</div>
    </ContextMenu>
</template>

<script setup>
import { ref } from 'vue';
import ContextMenu from './ContextMenu.vue';

const menu = ref();

const showMenu = (event) => {
    menu.value.open(event);
};
</script>

<style scoped>
.file-item {
    padding: 20px;
}

.menu-item {
    padding: 10px 15px;
    cursor: pointer;
}

.menu-item:hover {
    background: #f5f5f5;
}
</style>