import { MainURL } from '../../../config/api_urls.js'
import { getAPIData } from '../../../helpers/promise.js'
import { area_names } from '../../../helpers/translate.js'

document.addEventListener('DOMContentLoaded', () => {
   let contents = document.getElementsByClassName('content')
   const displayContent = (path_name, callback) => {
      let the_content = document.getElementById(path_name)
      for(let i = 0; i < contents.length; i++){ contents[i].style.display = 'none' }
      the_content.style.display = 'block'
      callback(the_content)
   }

   const createWeatherTable = (data) => {
      displayContent('weather', (weather_content) => {
         weather_content.querySelector('h1').innerHTML = data.city.name
         console.log(weather_content)
         for(let i = 0; i < data.list.length; i++){
            let overall = data.list[i]
            console.log(overall)
            let tr = document.createElement('tr')
            let tds = new Array(8)
               tds[0] = document.createElement('td')
                  tds[0].innerHTML = overall.dt_txt
               tds[1] =  document.createElement('td')
                  // TODO: iconの取得
                  tds[1].innerHTML = overall.weather[0].description
               tds[2] = document.createElement('td')
                  // TODO: CとFに切り替える機能と
                  tds[2].innerHTML = overall.main.temp_max
               tds[3] = document.createElement('td')
                  // TODO: CとFに切り替える機能と
                  tds[3].innerHTML = overall.main.temp_min
               tds[4] = document.createElement('td')
                  // TODO: CとFに切り替える機能と
                  tds[4].innerHTML = overall.main.temp
               tds[5] = document.createElement('td')
                  // TODO: CとFに切り替える機能と
                  tds[5].innerHTML = overall.main.humidity
               tds[6] = document.createElement('td')
                  tds[6].innerHTML = overall.rain['3h']
               tds[7] = document.createElement('td')
                  // TODO: CとFに切り替える機能と
                  tds[7].innerHTML = overall.wind.speed
            for(let j = 0; j < tds.length; j++){
               tr.appendChild(tds[j])
            }
            weather_content.querySelector('table tbody').appendChild(tr)
         }
      })

   }

   const createBinTable = (data) => {
      displayContent('garbage', (garbage_content) => {
         garbage_content.querySelector('p').innerHTML = data
      })
   }

   const setAPIData = (path) => {
      const xhr_url = MainURL + path
      getAPIData(xhr_url).then((data) => {
         let parsed_data = JSON.parse(data)
            // TODO: データ構造を極力統一してif分岐をなくす
            if(path == 'weather'){
               createWeatherTable(parsed_data)
            }else if(path == 'garbage'){
               createBinTable(parsed_data)
            }
         // content.innerHTML = parsed_data
         console.log(parsed_data)
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
