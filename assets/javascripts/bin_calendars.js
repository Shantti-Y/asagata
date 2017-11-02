import { displayContent } from '../../helpers/create_component.js'

import Vue from 'vue'
import binCalendar from '../../views/bin_calendars/main.vue'

const createBinTable = (data) => {
   /*
      The data delivered is like this
      {
         name:    "西渋川から一丁目",
         year:    2017,
         month:   1,
         days:    [
            [
               {
                  type:    "ペットボトル類",
                  color:   "green"
               }
            ]
         ],
         bins:    [
            {
               type:    "焼却ゴミ類",
               color:   "blue"
            }
         ]
      }
   */

   let bins = new Vue({
      el: '#main',
      render(h){
         return h(binCalendar, { props: { values: data } })
      }
   })

}

module.exports = { createBinTable }
