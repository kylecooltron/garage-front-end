
<template>
    <div>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <RoomGrid v-if="selectedRoom" :room="selectedRoom" />
      </div>
    </div>
  </template>
  
  <script>
   import { mapGetters, mapActions } from 'vuex';
  import RoomGrid from '@/components/RoomGrid.vue';

  export default {
    name: 'GarageRoom',
    components: { RoomGrid }, // Register it here
    computed: {
        roomId() {
            return this.$route.params.id; // Access the room ID from the URL
        },
        ...mapGetters(['isLoading', 'error', 'selectedRoom',]),
    },
    methods: {
      ...mapActions(['fetchRoom']),
    },
    mounted() {
      this.fetchRoom(this.roomId); // Fetch rooms when the component mounts
    },
  };
  </script>

