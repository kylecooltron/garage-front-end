import { createStore } from 'vuex';
import axios from 'axios'; // You can use axios or fetch API for HTTP requests

const store = createStore({
    state: {
        rooms: [],
        selectedRoom: null,
        loading: false,
        error: null,
    },
    mutations: {
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        SET_ROOM(state, room) {
            state.selectedRoom = room;
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        addToolToToolBox(state, { toolBoxId, tool }) {
            const toolBox = state.selectedRoom.toolBoxes.find(r => r.id === toolBoxId);
            if (toolBox) {
                toolBox.tools.push(tool);
            }
        },
        removeToolFromToolBox(state, { toolBoxId, toolId }) {
            const toolBox = state.selectedRoom.toolBoxes.find(r => r.id === toolBoxId);
            if (toolBox) {
                toolBox.tools = toolBox.tools.filter(
                    (tool) => tool.id !== toolId
                );
            }
        },
        addToolBoxToRoom(state, { toolBox }) {
            state.selectedRoom.toolBoxes.push(toolBox);
        },
        removeToolBoxFromRoom(state, { toolBoxId }) {
            state.selectedRoom.toolBoxes = state.selectedRoom.toolBoxes.filter(
                (toolBox) => toolBox.id !== toolBoxId
            );
        },
    },
    actions: {
        async fetchRooms({ commit }) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                const response = await axios.get('http://localhost:5023/api/rooms'); // Use your correct API URL
                commit('SET_ROOMS', response.data);
            } catch (error) {
                commit('SET_ERROR', 'Failed to fetch rooms');
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async fetchRoom({ commit }, room_id) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                const response = await axios.get(`http://localhost:5023/api/rooms/${room_id}`);
                commit('SET_ROOM', response.data);
            } catch (error) {
                commit('SET_ERROR', 'Failed to fetch rooms');
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async addRoom({ commit, dispatch }, room) {
            try {
                await axios.post('http://localhost:5023/api/rooms', room);
                dispatch('fetchRooms');
            } catch (error) {
                commit('SET_ERROR', 'Failed to add room');
            }
        },
        async createTool({ commit, state }, payload) {
            try {
                await axios.post(
                    `http://localhost:5023/api/rooms/${state.selectedRoom.id}/toolboxes/${payload.toolBoxId}/tools`,
                    payload.tool
                );
            } catch (error) {
                console.error('Error creating tool:', error.response ? error.response.data : error.message);
                commit('SET_ERROR', 'Failed to update room');
            }
        },
        addToolToToolBox({ commit, dispatch, state }, payload) {
            if (state.selectedRoom) {
                dispatch('createTool', payload);
                commit('addToolToToolBox', payload);
            } else {
                commit('SET_ERROR', 'No room selected');
            }
        },
        async deleteTool({ commit, state }, payload) {
            try {
                await axios.delete(
                    `http://localhost:5023/api/rooms/${state.selectedRoom.id}/toolboxes/${payload.toolBoxId}/tools/${payload.toolId}`
                );
            } catch (error) {
                console.error('Error deleting tool:', error.response ? error.response.data : error.message);
                commit('SET_ERROR', 'Failed to update room');
            }
        },
        removeToolFromToolBox({ commit, dispatch, state }, payload) {
            if (state.selectedRoom) {
                dispatch('deleteTool', payload);
                commit('removeToolFromToolBox', payload);
            } else {
                commit('SET_ERROR', 'No room selected');
            }
        },
        async createToolBox({ commit, state }, payload) {
            try {
                await axios.post(
                    `http://localhost:5023/api/rooms/${state.selectedRoom.id}/toolboxes/`,
                    payload.toolBox
                );
            } catch (error) {
                console.error('Error creating tool box:', error.response ? error.response.data : error.message);
                commit('SET_ERROR', 'Failed to update room');
            }
        },
        addToolBoxToRoom({ commit, dispatch, state }, payload) {
            console.log(payload);
            if (state.selectedRoom) {
                dispatch('createToolBox', payload);
                commit('addToolBoxToRoom', payload);
            } else {
                commit('SET_ERROR', 'No room selected');
            }
        },
        async deleteToolBox({ commit, state }, payload) {
            try {
                await axios.delete(
                    `http://localhost:5023/api/rooms/${state.selectedRoom.id}/toolboxes/${payload.toolBoxId}`
                );
            } catch (error) {
                console.error('Error deleting tool box:', error.response ? error.response.data : error.message);
                commit('SET_ERROR', 'Failed to update room');
            }
        },
        removeToolBoxFromRoom({ commit, dispatch, state }, payload) {
            if (state.selectedRoom) {
                dispatch('deleteToolBox', payload);
                commit('removeToolBoxFromRoom', payload);
            } else {
                commit('SET_ERROR', 'No room selected');
            }
        },
    },
    getters: {
        rooms: (state) => state.rooms,
        selectedRoom: (state) => state.selectedRoom,
        isLoading: (state) => state.loading,
        error: (state) => state.error,
    },
});

export default store;
