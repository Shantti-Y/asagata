document.addEventListener('DOMContentLoaded', () => {
   const getAPIData = (URL) => {
      return new Promise((resolve, reject) => {
         let request = new XMLHttpRequest()
         request.open('GET', URL, true)
         console.log(URL)
         request.onload = () => {
            if(request.status === 200){
               resolve(request.responseText)
            }else{
               reject(new Error(request.statusText))
            }
         }

         request.onerror = () => {
            reject(new Error(request.statusText))
         }

         request.send()
      })
   }

   const url = 'http://dev.shanttiy.com:3000/'
   let type_tag = document.getElementById('type')
   let description_tag = document.getElementById('description')
   const setAPIData = (path) => {
      let xhr_url = url + path
      getAPIData(xhr_url).then((data) => {
         let parsed_data = JSON.parse(data)
         type_tag.innerHTML = parsed_data.type
         description_tag.innerHTML = parsed_data.description
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
