import { createRouter, createWebHistory } from 'vue-router';
import GarageHome from '@/views/GarageHome.vue';
import GarageRoomList from '@/views/GarageRoomList.vue';
import GarageRoom from '@/views/GarageRoom.vue';

const routes = [
    { path: '/', component: GarageHome },
    { path: '/room-list', component: GarageRoomList },
    { path: '/room/:id', component: GarageRoom },
    // { path: '/toolbox', component: GarageToolbox },
    // { path: '/add-tool', component: AddTool }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
