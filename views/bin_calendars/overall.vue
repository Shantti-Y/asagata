<template>
   <div id="overall">
      <p id="left" class="pager" v-on:click="setAPIData('garbage')"><i class="fa fa-angle-double-left"></i></p>
      <div id="fullyear">
         <ul>
            <li class="year">{{ selected_date.year }}年</li>
            <li class="month-date">{{ selected_date.month }}月{{ selected_date.day }}日</li>
         </ul>
      </div>
      <div id="bin-types">
         <ul v-if="selected_date.bins != 'no bin'">
            <li>{{ selected_date.bins[0].type }}</li>
         </ul>
      </div>
      <p id="right" class="pager" v-on:click="setAPIData('garbage')"><i class="fa fa-angle-double-right"></i></p>
   </div>
</template>
<script>
   export default {
      props: {
         selected_date: Object
      },
      data: function(){
         return {
            setAPIData: require('../../assets/javascripts/app.js').setAPIData
         }
      }
   }
</script>
