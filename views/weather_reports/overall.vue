<template>
   <div id="overall">
      <div id="condition">
         <p>{{ item.month }}月{{ item.day }}日</p>
         <img v-bind:src="'http://openweathermap.org/img/w/' + img + '.png'">
      </div>
      <div id="contents">
         <div id="temp">
            <p>{{ description }}</p>
            <p>{{ temp }}</p>
            <ul>
               <li v-for="(temp, idx) in temp_units" v-bind:class="temp.class_name" v-on:click="changeTempExp(idx)">{{ temp.expression }}</li>
            </ul>
         </div>
         <ul id="others">
            <li>湿度: {{ humidity }}%</li>
            <li>風速: {{ wind.speed }} m/s ({{ wind.deg }})</li>
         </ul>
      </div>
   </div>
</template>
<script>
   import Vue from 'vue'

   export default {
      props: {
         item: Object,
         temp_exp: Number
      },
      data: function(){
         return {
            // TODO: filesystemからjsonを読み込めるようにしたい
            translations: { "01d": "快晴",
                            "02d": "晴れ",
                            "03d": "薄曇",
                            "04d": "曇り",
                            "09d": "小雨",
                            "10d": "雨",
                            "11d": "雷雨",
                            "13d": "雪",
                            "50d": "霧" },
            img:          '',
            description:  '',
            temp:         '',
            humidity:     '',
            wind:         '',
            temp_units:   [{ class_name: 'active', expression: '℃' },
                           { class_name: '', expression: '℉' }]
         }
      },
      methods: {
         initializeData: function(item){
            this.img = item.weathers[0].weather.icon.slice(0, 2) + "d"
            // 本来のdescriptionが必要ないくらい細かいためアイコンの名前から天気を取り出すことに
            this.description = this.translations[this.img]
            this.temp = Math.floor(item.weathers[0].temp.temp - 273.15)
            this.humidity = item.weathers[0].rain.humidity
            this.wind = item.weathers[0].wind
            this.defineWindDeg()
         },
         defineWindDeg: function(){
            switch(true){
               case(this.wind.deg >= 0 && this.wind.deg <= 11.25):
                  this.wind.deg = '北'
                  break
               case(this.wind.deg >= 11.26 && this.wind.deg <= 33.75):
                  this.wind.deg = '北北東'
                  break
               case(this.wind.deg >= 33.76 && this.wind.deg <= 56.25):
                  this.wind.deg = '北東'
                  break
               case(this.wind.deg >= 56.26 && this.wind.deg <= 78.75):
                  this.wind.deg = '東北東'
                  break
               case(this.wind.deg >= 78.76 && this.wind.deg <= 101.25):
                  this.wind.deg = '東'
                  break
               case(this.wind.deg >= 101.26 && this.wind.deg <= 123.75):
                  this.wind.deg = '東南東'
                  break
               case(this.wind.deg >= 123.76 && this.wind.deg <= 146.25):
                  this.wind.deg = '南東'
                  break
               case(this.wind.deg >= 146.26 && this.wind.deg <= 168.75):
                  this.wind.deg = '南南東'
                  break
               case(this.wind.deg >= 168.76 && this.wind.deg <= 191.25):
                  this.wind.deg = '南'
                  break
               case(this.wind.deg >= 191.26 && this.wind.deg <= 213.75):
                  this.wind.deg = '南南西'
                  break
               case(this.wind.deg >= 213.76 && this.wind.deg <= 236.25):
                  this.wind.deg = '南西'
                  break
               case(this.wind.deg >= 236.26 && this.wind.deg <= 258.75):
                  this.wind.deg = '西南西'
                  break
               case(this.wind.deg >= 258.76 && this.wind.deg <= 281.25):
                  this.wind.deg = '西'
                  break
               case(this.wind.deg >= 281.26 && this.wind.deg <= 303.75):
                  this.wind.deg = '西北西'
                  break
               case(this.wind.deg >= 303.76 && this.wind.deg <= 326.25):
                  this.wind.deg = '北西'
                  break
               case(this.wind.deg >= 326.26 && this.wind.deg <= 348.75):
                  this.wind.deg = '北北西'
                  break
               default:
                  this.wind.deg = '北'
                  break
            }
         },
         changeTempExp: function(idx){
            this.$emit('temp-exp', idx)
         }
      },
      created: function(){
         this.initializeData(this.item)
      },
      watch: {
         item: function(value, old_value){
            this.initializeData(value)
         },
         temp_exp: function(value, old_value){
            this.temp_units[old_value].class_name = ''
            this.temp_units[value].class_name = 'active'
            var current_temp = this.item.weathers[0].temp.temp
            this.temp = value == 0 ? Math.floor(current_temp - 273.15) : Math.floor((current_temp * (9 / 5)) - 459.67)
         }
      }
   }
</script>
