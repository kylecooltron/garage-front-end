<template>
    <div class="tools-list">
        <h2>✨Create Tool Box</h2>
    
        <!-- Tool Input Form -->
        <div>
        <input 
            v-model="newToolBoxName" 
            placeholder="Enter new tool box name" 
            @keyup.enter="addToolBox" 
        />
        <button @click="addToolBox">Create</button>
        </div>
    </div>
    </template>
    
    <script>
       import { mapActions } from 'vuex';
    
    export default {
    props: {
        room: Object,
        slotId: Number,
        selectToolBox: Function,
    },
    data() {
        return {
            newToolBoxName: '',
        };
    },
    methods: {
        ...mapActions(['addToolBoxToRoom']),
        getMaxToolBoxId() {
            if (this.room.toolBoxes && this.room.toolBoxes.length > 0) {
                return this.room.toolBoxes.reduce((maxId, toolbox) => Math.max(maxId, toolbox.id), -Infinity);
            }
            return 0;
        },
        addToolBox() {
            if (this.newToolBoxName.trim() !== '') {
                const newToolBox = {
                    id: this.getMaxToolBoxId() + 1,
                    slotId: this.slotId,
                    name: this.newToolBoxName,
                    description: "",
                    tools: [],
                };
                this.addToolBoxToRoom({
                    toolBox: newToolBox,
                });
                this.selectToolBox(newToolBox);
                this.newToolBoxName = ''; // Clear input field after adding
            }
        },
    },
    };
    </script>
    