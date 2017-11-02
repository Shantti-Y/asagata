<template>
   <div id="bin-calendar">
      <overall></overall>
      <calendar
         :values="values"
         :calendar="calendar"
      ></calendar>
      <descriptions
         :bins="values.bins"
      ></descriptions>
   </div>
</template>
<script>
   import Vue from 'vue'
   import Overall from './overall.vue'
   import Calendar from './calendar.vue'
   import Descriptions from './descriptions.vue'

   export default {
      props: ['values'],
      data: function() {
         return {
            calendar:   new Array([], [], [], [], [])
         }
      },
      methods: {
         emptyDay: function(){
            return { day: 'empty' }
         },
         insertDays: function(d) {
            if(this.values.calendar.days[d][0] == undefined){
               return { day: d + 1, bin: 'no bin' }
            }else{
               return { day: d + 1, bin: this.values.calendar.days[d][0] }
            }
         }
      },
      created: function() {
         // TODO: 繰り返し処理の関数化、DRY
         var calendar_cells = new Array(35)

         var year = this.values.calendar.year
         var month = this.values.calendar.month - 1
         var dates = this.values.calendar.days.length

         calendar_cells.fill(this.emptyDay())

         var first_day = new Date(year, month, 1).getDay()
         var last_day = new Date(year, month, dates)

         var j = first_day
         for(var i = 0; i < dates; i++){
            calendar_cells[j] = this.insertDays(j)
            j += 1
         }

         for(var i = 0; i < this.calendar.length; i++){
            var first_idx = 0 + (7 * i)
            var last_idx = first_idx + 7
            this.calendar[i] = calendar_cells.slice(first_idx, last_idx)
         }
      },
      components: {
         'overall':      Overall,
         'calendar':     Calendar,
         'descriptions': Descriptions
      }
   }
</script>
