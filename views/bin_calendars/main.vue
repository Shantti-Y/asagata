<template>
   <div id="main">
      <div id="bin-calendar">
         <overall
            :selected_date="selected_date"
         ></overall>
         <calendar
            :bindates="values.calendar"
            v-on:select-date="showActiveBindata"
         ></calendar>
         <descriptions
            :bins="values.bins"
         ></descriptions>
      </div>
   </div>
</template>
<script>
   import Vue from 'vue'
   import Overall from './overall.vue'
   import Calendar from './calendar.vue'
   import Descriptions from './descriptions.vue'

   export default {
      props: ['values'],
      components: {
         'overall':      Overall,
         'calendar':     Calendar,
         'descriptions': Descriptions
      },
      data: function(){
         return {
            selected_date: this.setSelectedDate(1, 'no bin') // dummy value until calendar component sends an actual data
         }
      },
      methods: {
         setSelectedDate(day, bins){
            return {
               year:  this.values.calendar.year,
               month: this.values.calendar.month,
               day:   day,
               bins:  bins
            }
         },
         showActiveBindata: function(date){
            this.selected_date = this.setSelectedDate(date.day, date.bins)
         }
      }
   }
</script>
