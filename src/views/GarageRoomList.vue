
<template>
    <div>
      <h1>Rooms</h1>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <ul v-else>
        <RoomLink v-for="room in rooms" :key="room.id" :room="room" class="room-link"/>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import RoomLink from '@/components/RoomLink.vue'; // Make sure you import it correctly

  export default {
    name: 'GarageRooms',
    components: { RoomLink }, // Register it here
    computed: {
      ...mapGetters(['rooms', 'isLoading', 'error']),
    },
    methods: {
      ...mapActions(['fetchRooms']),
    },
    mounted() {
      this.fetchRooms(); // Fetch rooms when the component mounts
    },
  };
  </script>

  <style>
  .room-link{
    margin-top: 2em;
  }
</style>



