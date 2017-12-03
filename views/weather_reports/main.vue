<template>
   <div id="main">
      <div id="weather-report">
         <overall
            :item="dates[selected_idx]"
            :temp_exp="temp_exp"
            v-on:temp-exp="setTempExp"
         ></overall>
         <div id="chart">
            <chart
               :item="dates[selected_idx]"
               :temp_exp="temp_exp"
               :mode="mode"
            ></chart>
         </div>

         <mode
            :mode="mode"
            v-on:mode="setMode">
         </mode>
         <selection
            :items="dates"
            :temp_exp="temp_exp"
            :selected_date="selected_idx"
            v-on:select-date="setSelectedDate"
         ></selection>
      </div>
   </div>
</template>
<script>
   import Vue from 'vue'
   import Overall from './overall.vue'
   import Chart from './chart.vue'
   import Mode from './mode.vue'
   import Selection from './selection.vue'

   export default {
      props: ['values'],
      components: {
         'overall': Overall,
         'chart': Chart,
         'selection': Selection,
         'mode':  Mode
      },
      data: function(){
         return {
            dates: new Array(),
            selected_idx: 0,
            temp_exp: 0,
            mode: 0
         }
      },
      methods: {
         setSelectedDate: function(idx){
            this.selected_idx = idx
         },
         setTempExp: function(idx){
            this.temp_exp = idx
         },
         setMode: function(idx){
            this.mode = idx
         }
      },
      created: function(){
         /*
            Chart should show by referring this foloowing data
            {
               month: 11,
               day:   10,
               weathers: [
                  { weather description },
                  { weather description }
               ]
            }
         */
         var current_date = new Date(this.values.terms[0].date_int)
         var weather_data = {
            month: current_date.getMonth() + 1,
            day:   current_date.getDate(),
            weathers: [this.values.terms[0]]
         }
         for(var i = 1; i < this.values.terms.length; i++){
            var instant_date = new Date(this.values.terms[i].date_int)
            var instant_month = instant_date.getMonth()
            var instant_day = instant_date.getDate()
            if(instant_day > weather_data.day){
               this.dates.push(weather_data)
               weather_data = {
                  month: instant_date.getMonth() + 1,
                  day:   instant_date.getDate(),
                  weathers: [this.values.terms[i]]
               }
            }else{
               weather_data.weathers.push(this.values.terms[i])
            }

            if(i == this.values.terms.length - 1)[
               this.dates.push(weather_data)
            ]
         }
      }
   }
</script>
