import { MainURL } from '../../config/api_urls.js'
import { getAPIData } from '../../helpers/promise.js'
import Vue from 'vue'

import { createWeatherTable } from './weather_reports.js'
import { createBinTable } from './bin_calendars.js'

const setAPIData = (path) => {
   const xhr_url = MainURL + path
   getAPIData(xhr_url).then((data) => {
      let parsed_data = JSON.parse(data)
         if(/weather.+/.test(path)){
            createWeatherTable(parsed_data)
         }else if(/garbage.+/.test(path)){
            createBinTable(parsed_data)
         }
   }).catch((msg) => {
      console.log(msg)
   })
}

document.addEventListener('DOMContentLoaded', () => {
   const year = new Date().getFullYear()
   const month = new Date().getMonth() + 1
   const paths = ['weather', 'garbage']
   let menu_btns = document.getElementsByClassName('menu-btn')
   for(let i = 0; i < menu_btns.length; i++){
      menu_btns[i].addEventListener('click', (e) => {
         e.preventDefault()
         setAPIData(paths[i] + '/' + year + '/' + month)
      })
   }
})

module.exports = { setAPIData }
