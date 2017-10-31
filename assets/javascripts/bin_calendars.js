import { displayContent } from '../../helpers/create_component.js'

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
         ]
      }
   */

   displayContent('garbage', (garbage_content) => {
      console.log(data)
      garbage_content.querySelector('p').innerHTML = data
   })
}

module.exports = { createBinTable }
