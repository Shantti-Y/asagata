import { MainURL } from '../../config/api_urls.js'
import { getAPIData } from '../../helpers/promise.js'
import Vue from 'vue'

import { createWeatherTable } from './weather_reports.js'
import { createBinTable } from './bin_calendars.js'

document.addEventListener('DOMContentLoaded', () => {
   const setAPIData = (path) => {
      const xhr_url = MainURL + path
      getAPIData(xhr_url).then((data) => {
         let parsed_data = JSON.parse(data)
            if(path == 'weather'){
               createWeatherTable(parsed_data)
            }else if(path == 'garbage'){
               createBinTable(parsed_data)
            }
      }).catch((msg) => {
         console.log(msg)
      })
   }

   const paths = ['weather', 'garbage']
   let menu_btns = document.getElementsByClassName('menu-btn')
   for(let i = 0; i < menu_btns.length; i++){
      menu_btns[i].addEventListener('click', (e) => {
         e.preventDefault()
         setAPIData(paths[i])
      })
   }
})
