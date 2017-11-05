import { displayContent } from '../../helpers/create_component.js'

import Vue from 'vue'
import weatherReport from '../../views/weather_reports/main.vue'

const createWeatherTable = (data) => {
   /*
      The data delivered is like this
      {
         cod: "200",
         message: 0.0055,
         cnt: 40,
         list: [
            {
               dt: 1508889600,
               dt_txt: "2017-10-25 00:00:00",      # REVIEW
               main: {
                  grnd_level: 999.19,
                  humidity:   100,                 # REVIEW
                  pressure:   999.19,
                  sea_level:  1032.84,
                  temp:       286.22,              # REVIEW
                  temp_kf:    0.57,
                  temp_max:   286.22,              # REVIEW
                  temp_min:   285.65               # REVIEW
               },
               rain: {
                  3h: 7.64                         # REVIEW
               },
               sys:  {
                  pod: "d"
               },
               weather: [
                  {
                     description:   "moderate rain",     # REVIEW
                     icon:          "10d",               # REVIEW
                     id:            501,
                     main:          "Rain"               # REVIEW
                  }
               ],
               wind: {
                  speed:   2.11,                   # REVIEW
                  deg:     338.506                 # REVIEW
               }
            }
         ],
         city: {
            coord: {
               lat: 35.2194,
               lon: 136.1365
            },
            country: "JP",
            id: 1852553,
            name: "Shiga-ken"
         }
      }

      {
         list: [
            {
               dt_txt: "2017-10-25 00:00:00"
               main: {
                  humidity:   100,
                  temp:       286.22,
                  temp_max:   286.22,
                  temp_min:   285.65
               },
               rain: {
                  3h: 7.64
               },
               weather: [
                  {
                     description:   "moderate rain",
                     icon:          "10d",
                     main:          "Rain"
                  }
               ],
               wind: {
                  speed:   2.11,
                  deg:     338.506
               }
            }
         ]
      }
   */

   let weather_reports = new Vue({
      el: '#main',
      render(h){
         return h(weatherReport)
      }
   })
}

module.exports = { createWeatherTable }
