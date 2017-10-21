(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
