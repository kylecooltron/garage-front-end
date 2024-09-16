<template>
    <h1>{{ room.name }}</h1>
    <div class="room-view">
      <div id="toolbox">
        <div class="toolbox-slot" v-for="slot in 24" :key="slot"   @click="selectSlot(slot)"
        :class="{ selected: slot === selectedSlot}"
      >
          <span v-if="toolBoxMap[slot]">{{ toolBoxMap[slot].name }}</span>
        </div>
      </div>
      <AddToolBox v-if="!selectedToolBox && selectedSlot" :room="room" :slotId="selectedSlot" :selectToolBox="selectToolBox"/>
      <ToolBox :selectedToolBox="selectedToolBox" :resetSelection="resetSelection"/>
    </div>
    
  </template>
  
  <script>
import AddToolBox from './AddToolBox.vue';
import ToolBox from './ToolBox.vue';

  export default {
    props: {
        room: Object
    },
    components: { ToolBox, AddToolBox},
    data() {
      return {
        selectedToolBox: null,
        selectedSlot: null,
      };
    },
    computed: {
      toolBoxMap() {
        const map = {};
        this.room.toolBoxes.forEach(toolBox => {
          map[toolBox.slotId] = toolBox;
        });
        return map;
      }
    },
    methods: {
      selectToolBox(toolBox) {
        if (toolBox) {
          this.selectedToolBox = toolBox;
        } else {
          this.selectedToolBox = null;
        }
      },
      selectSlot(slotId){
        this.selectToolBox(this.toolBoxMap[slotId]);
        this.selectedSlot = slotId;
      },
      resetSelection(){
        this.selectSlot(this.selectedSlot);
      }
    }
  };
  </script>
  
<style>
  #toolbox{
    background-color: whitesmoke;
    border-radius: 5px;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: 65%;
    float: left;
  }
  .toolbox-slot{
    background-color: rgb(235, 235, 235);
    aspect-ratio: 1 / 1;
    border-radius: 5px;
    margin: 10px;
    font-weight: bolder;

    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(90, 90, 90);
  }
  .selected {
    border: 1px solid rgb(167, 252, 245);
  }
  .tools-list {
    margin-top: 20px;
    float: right;
    justify-content: center;
    background-color: rgb(253, 254, 255);
    width: 20%;
    padding: 1em;
  }

  button{
    border: none;
    margin-top: 0.5em;
    background-color: rgb(232, 243, 248);
    cursor: pointer;
  }

  .x-button{
    margin-left: 1em;
    border-radius: 4px;
    background-color: rgb(255, 242, 224);
    font-size: small;
    padding: 1px 4px 1px 4px;
  }

</style>