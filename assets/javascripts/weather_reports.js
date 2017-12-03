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
   let terms = new Array()
   for(let i = 0; i < data.list.length; i++){
      let date = data.list[i].dt_txt
      let date_int = data.list[i].dt * 1000
      let weather = data.list[i].weather[0]
      let temp = {
         temp:       data.list[i].main.temp,
         max_temp:   data.list[i].main.temp_max,
         min_temp:   data.list[i].main.temp_min
      }
      let rain = {
         precipitation: data.list[i].rain,
         humidity:      data.list[i].main.humidity
      }
      let wind = {
         speed:   data.list[i].wind.speed,
         deg:     data.list[i].wind.deg
      }

      let term_data = {
         date:       date,
         date_int:   date_int,
         weather:    weather,
         temp:       temp,
         rain:       rain,
         wind:       wind
      }
      terms.push(term_data)
   }
   // Create props to make itslef easy to be referred with value
   let vue_values = {
      area_name: data.city.name,
      terms:     terms
   }
   let weather_reports = new Vue({
      el: '#main',
      render(h){
         return h(weatherReport, { props: { values: vue_values } })
      }
   })
}

module.exports = { createWeatherTable }
