<template>
   <div id="weathers">
      <ul>
         <li v-for="(item, idx) in summaries" v-bind:class="item.class_name" v-on:click="selectDate(idx)">
            <p>{{ item.date }}</p>
            <img v-bind:src="'http://openweathermap.org/img/w/' + item.icon + '.png'">
            <p class="temp">最高：{{ item.max_temp }}</p>
            <p class="temp">最低：{{ item.min_temp }}</p>
         </li>
      </ul>
   </div>
</template>
<script>
   import Vue from 'vue'

   export default {
      props: {
         items: Array,
         temp_exp: Number,
         selected_date: Number
      },
      data: function(){
         return {
            summaries: new Array(),
            temp_values: new Array(),
         }
      },
      methods: {
         initializeData: function(){
            for(var i = 0; i < this.items.length; i++){
               for(var j = 0; j < this.items[i].weathers.length; j++){
                  this.temp_values.push(this.items[i].weathers[j].temp.temp)
               }
               var content = {
                  date: this.items[i].month + '月' + this.items[i].day + '日',
                  icon: this.items[i].weathers[0].weather.icon.slice(0, 2) + "d",
                  max_temp: this.getFormattedTemp(this.temp_values.max()) + this.getTempUnit(),
                  min_temp: this.getFormattedTemp(this.temp_values.min()) + this.getTempUnit(),
                  class_name: i == 0 ? 'active' : ''
               }
               this.summaries.push(content)
            }
         },
         selectDate: function(idx){
            this.$emit('select-date', idx)
         },
         getFormattedTemp: function(temp){
            return this.temp_exp == 0 ? Math.floor(temp - 273.15) : Math.floor((temp * (9 / 5)) - 459.67)
         },
         getTempUnit: function(){
            return this.temp_exp == 0 ? '℃' : '℉'
         },
         changeFormattedTemp: function(){
            for(var i = 0; i < this.summaries.length; i++){
               this.summaries[i].max_temp = this.getFormattedTemp(this.temp_values.max()) + this.getTempUnit()
               this.summaries[i].min_temp = this.getFormattedTemp(this.temp_values.min()) + this.getTempUnit()
            }
         }
      },
      created: function(){
         // TODO: VueコンポーネントをES6仕様に書き換えられる環境を構築
         //       => 下記prototypeチェーンをhelpers下に置きクラス拡張
         Array.prototype.max = function(){
            var max_val = this[0]
            for(var i = 1; i < this.length; i++){
               if(max_val < this[i]){ max_val = this[i] }
            }
            return max_val
         }
         Array.prototype.min = function(){
            var min_val = this[0]
            for(var i = 1; i < this.length; i++){
               if(min_val > this[i]){ min_val = this[i] }
            }
            return min_val
         }

         this.initializeData()
      },
      watch: {
         temp_exp: function(value){
            this.changeFormattedTemp()
         },
         selected_date: function(value, old_value){
            this.summaries[old_value].class_name = ''
            this.summaries[value].class_name = 'active'
         }
      }
   }
</script>
