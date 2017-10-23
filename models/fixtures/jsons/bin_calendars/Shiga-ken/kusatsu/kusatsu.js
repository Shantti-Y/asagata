const xlsx = require('xlsx')
let fs = require('fs')

// Reference of trash separation in each area in Kusatsu-shi
let worksheet = xlsx.readFile('./nittei.xls').Sheets['area_days']
// Initial instances
const weekdays = { '日': 0, '月': 1, '火': 2, '水': 3, '木': 4, '金': 5, '土': 6 }
const month_dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const types = [{ col: 'C', category: worksheet['C1'].w, color: 'blue' },
               { col: 'D', category: worksheet['D1'].w, color: 'pink' },
               { col: 'E', category: worksheet['E1'].w, color: 'green' },
               { col: 'F', category: worksheet['F1'].w, color: 'gray' },
               { col: 'G', category: worksheet['G1'].w, color: 'skyblue' },
               { col: 'H', category: worksheet['H1'].w, color: 'purple' },
               { col: 'I', category: worksheet['I1'].w, color: 'orange' },
               { col: 'J', category: worksheet['J1'].w, color: 'beige' },
               { col: 'K', category: worksheet['K1'].w, color: 'yellow' },
               { col: 'L', category: worksheet['L1'].w, color: 'brown' }]
const cols = 94

const formatDate = (date, day) => {
   let target_date = new Date(date.setDate(day))
   let y = target_date.getFullYear()
   let m = target_date.getMonth()
   let d = target_date.getDate()
   return Date.parse(new Date(y, m, d))
}

let tmp_status = new Array()
for(let i = 2; i <= cols; i++){
   let name = worksheet['A' + i].w.match(/\s([^（.]+)/)[1]
   let tmp_days = new Array()

   // Looped by type of trashes
   for(let j = 0; j < types.length; j++){
      let type = types[j]
      let target_days = worksheet[type.col + i].w.split(/\s/)

      for(let k = 0; k < target_days.length; k++){
         let status = { name: target_days[k], type: { category: type.category, color: type.color } }
         tmp_days.push(status)
      }
   }
   tmp_status.push({ name: name, types: tmp_days })
}

let status = new Array()

// Looped by areas
for(let i = 0; i < tmp_status.length; i++){
   let place_data = { name: tmp_status[i].name, bins: new Array() }
   let types = tmp_status[i].types

   // Looped by months
   for(let m = 0; m < month_dates.length; m++){
      let date = new Date(new Date().setMonth(m))
      let first_day = new Date(date.setDate(1)).getDay()
      let max_days = month_dates[m]

      // Looped by targeted weekdays
      for(let j = 0; j < types.length; j++){
         let type = types[j]
         let current_day = weekdays[type.name[0]] + 1 - first_day
         while(current_day <= max_days){
            let params = {}
            if(current_day <= 0 || (m == 0 && current_day - 3 <= 0)){
               current_day += 7
               continue
            }
            if(type.name[0].length == 1){
               params = { date: formatDate(date, current_day), type: type.type }
               place_data.bins.push(params)
            }else{
               let week
               if(m == 0){
                  week = Math.ceil((current_day - 3) / 7)
               }else{
                  week = Math.ceil(current_day / 7)
               }
               if(week == parseInt(type.name[0][1])){
                  params = { date: formatDate(date, current_day), type: type.type }
                  place_data.bins.push(params)
               }
            }
            current_day += 7
         }
      }
   }
   status.push(place_data)
}

fs.writeFile('./kusatsu.json', JSON.stringify(status, null, 3), (err) => {
   if(err) throw err
   console.log('complete!')
})
