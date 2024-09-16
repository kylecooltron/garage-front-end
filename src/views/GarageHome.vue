<template>
    <div>
        <h1>Welcome to the Garage Organizer</h1>
        <div class="home">
            <p>Stay organized</p>
            <router-link to="/room-list">Get Started</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GarageHome', // Use multi-word component name
};
</script>

<style>
.home{
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
}
</style>