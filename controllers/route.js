import http from 'http'
import fs from 'fs'
import { getWeatherReport } from './api_docs/weather_reports.js'
import { getBinCalendars } from './api_docs/bin_calendars.js'

const port = 3000

http.createServer( (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*')
   res.writeHead(200, { 'Content-Type': 'text/html' })

   new Promise((resolve, reject) => {
      switch(req.url){
         case '/weather':
            resolve(getWeatherReport('Shiga-ken'))
            break
         case '/garbage':
            resolve(getBinCalendars('西渋川'))
            break
         default:
            resolve('hello')
            break
      }
   }).then((value) => {
      res.write(JSON.stringify(value))
      res.end()
   }).catch((err) => {
      console.log(new Error(err))
   })

}).listen(port)

console.log('Server running at port ' + port + '...')
