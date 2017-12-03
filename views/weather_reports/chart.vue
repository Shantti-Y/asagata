<template>
   <canvas id="canvas"></canvas>
</template>
<script>
   import Chart from 'chart.js'
   import Vue from 'vue'

   export default {
      props: {
         item: Object,
         temp_exp: Number,
         mode: Number
      },
      data: function(){
         return {
            terms:  new Array(),
            values: new Array()
         }
      },
      methods: {
         initializeData: function(){
            this.terms = new Array()
            this.values = new Array()

            for(var i = 0; i < this.item.weathers.length; i++){
               var date = new Date(this.item.weathers[i].date_int)
               this.terms.push(date.getHours() + ":00")
               if(this.mode == 0){
                  this.values.push(this.getFormattedTemp(this.item.weathers[i].temp.temp))
               }else{
                  this.values.push(this.getPrecipitation(this.item.weathers[i].rain.precipitation))
               }
            }
         },
         drawLineChart: function(){
            let ctx = document.getElementById('canvas').getContext('2d')

            let chart_data = {
               labels: this.terms,
               datasets: [
                 {
                   borderColor:     this.mode == 0 ? '#ffb366' : '#66b3ff',
                   backgroundColor: this.mode == 0 ? '#ffd9b3' : '#cce6ff',
                   data: this.values
                 }
              ],
            }
            var line_chart = new Chart(ctx, {
                  type: 'line',
                  data: chart_data,
                  options: {
                     legend: { display: false },
                     title: { display: false },
                     responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                         xAxes: [{
                           ticks: { fontSize: 9 }
                        }],
                         yAxes: [{
                            stacked: true,
                            ticks: {
                              display: false,
                              suggestedMax: parseInt(this.values.max()) + 2
                           }
                         }]
                      },
                      animation: {
                         duration: 0,
                         onComplete: function(){
                           let chartInstance = this['chart']
                           ctx = chartInstance.ctx
                           ctx.textAlign = 'center'
                           ctx.textBaseline = 'bottom'
                           ctx.fillStyle = '#404040'
                           ctx.font = "11px 'Helvetica Neue', Helvetica, Arial, sans-serif"

                           chart_data.datasets.forEach(function(dataset, i){
                              let meta = chartInstance.controller.getDatasetMeta(i)
                              meta.data.forEach(function(point, j){
                                 let temp = meta.controller._data[j]
                                 ctx.fillText(temp, point._model.x, point._model.y - 3)
                              })
                           })
                         }
                      }
                  }
            })
         },
         getFormattedTemp: function(temp){
            return this.temp_exp == 0 ? Math.floor(temp - 273.15) : Math.floor((temp * (9 / 5)) - 459.67)
         },
         getPrecipitation: function(precipitation){
            return precipitation.hasOwnProperty('3h') ? precipitation['3h'].toFixed(2) : 0
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
      mounted: function(){
         this.drawLineChart()
      },
      watch: {
         item: function(value){
            this.initializeData()
            this.drawLineChart()
         },
         temp_exp: function(value){
            this.initializeData()
            this.drawLineChart()
         },
         mode: function(value){
            this.initializeData()
            this.drawLineChart()
         }
      }
   }
</script>
