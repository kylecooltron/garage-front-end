<template>
    <div>
        <router-link :to="`/room/${room.id}`">{{ room.name }} ({{room.toolBoxes.length}} tool boxes) ({{toolCount}} tools)</router-link>
    </div>
</template>

<script>
export default {
    props: {
        room: Object
    },
    computed: {
        toolCount() {
            return this.room.toolBoxes.reduce((count, toolBox) => count + toolBox.tools?.length || 0, 0);
        }
    }
};
</script>