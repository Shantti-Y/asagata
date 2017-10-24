import { BinCalendarSrc } from '../../config/api_urls.js'
import fs from 'fs'

const linearSearch = (arr, key_name) => {
   let name = new RegExp(key_name)
   for(let i = 0; i < arr.length; i++){
      if(name.test(arr[i].name) == true){
         return arr[i]
      }
   }
}

const createCalendar = () => {
   
}

const getBinCalendars = (area_name) => {
   return new Promise((resolve, reject) => {
      fs.readFile('./models/fixtures/jsons/bin_calendars/Shiga-ken/kusatsu/kusatsu.json', 'utf-8', (err, data) => {
         let parsed_data = JSON.parse(data)
         resolve(linearSearch(parsed_data, area_name))
      })
   }).then((value) => {
      return value
   }).catch((err) => {
      return err
   })
}

module.exports = { getBinCalendars }
