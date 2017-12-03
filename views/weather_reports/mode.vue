<template>
   <div id="modes">
      <ul>
         <li v-for="(mode, idx) in mode_units" v-bind:class="mode.class_name" v-on:click="changeMode(idx)">{{ mode.expression }}</li>
      </ul>
   </div>
</template>
<script>
   import Vue from 'vue'

   export default {
      props: { mode: Number },
      data: function(){
         return {
            mode_units: [{ class_name: 'active', expression: '気温' },
                         { class_name: '', expression: '雨量' }]
         }
      },
      methods: {
         changeMode: function(idx){
            this.$emit('mode', idx)
         }
      },
      watch: {
         mode: function(value, old_value){
            this.mode_units[old_value].class_name = ''
            this.mode_units[value].class_name = 'active'
         }
      }
   }
</script>
