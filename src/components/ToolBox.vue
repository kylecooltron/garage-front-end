<template>
<div v-if="selectedToolBox" class="tools-list">
    <h2>{{ selectedToolBox.name }}<button @click="removeToolBox()" class="x-button">x</button></h2> 

    <!-- Tool Input Form -->
    <div>
    <input 
        v-model="newToolName" 
        placeholder="Enter new tool name" 
        @keyup.enter="addTool" 
    />
    <button @click="addTool">Add Tool</button>
    </div>

    <!-- Tools List -->
     <hr>
    <ul>
    <li v-for="tool in selectedToolBox.tools" :key="tool.id">
        {{ tool.name }}
        <button @click="removeTool(tool.id)" class="x-button">x</button>
    </li>
    </ul>
</div>
</template>

<script>
   import { mapActions } from 'vuex';

export default {
props: {
    selectedToolBox: Object,
    resetSelection: Function,
},
data() {
    return {
    newToolName: '',
    };
},
methods: {
    ...mapActions(['addToolToToolBox', 'removeToolFromToolBox', 'removeToolBoxFromRoom']),
    getMaxToolId() {
      if (this.selectedToolBox && this.selectedToolBox.tools.length > 0) {
        return this.selectedToolBox.tools.reduce((maxId, tool) => Math.max(maxId, tool.id), -Infinity);
      }
      return 0;
    },
    addTool() {
        if (this.newToolName.trim() !== '') {
            const newTool = {
                id: this.getMaxToolId() + 1,
                name: this.newToolName,
                description: ""
            };
            this.addToolToToolBox({
                toolBoxId: this.selectedToolBox.id,
                tool: newTool,
            });
            this.newToolName = '';
        }
    },
    removeTool(toolId) {
        this.removeToolFromToolBox({
            toolBoxId: this.selectedToolBox.id,
            toolId: toolId,
        });
    },
    removeToolBox() {
        this.removeToolBoxFromRoom({
            toolBoxId: this.selectedToolBox.id,
        });
        this.resetSelection()
    },
},
};
</script>
