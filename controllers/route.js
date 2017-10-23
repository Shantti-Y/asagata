import http from 'http'
import fs from 'fs'
import { getWeatherReport } from './api_docs/weather_reports.js'
import { getGarbageSchedules } from './api_docs/garbage_schedules.js'

const port = 3000

http.createServer( (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*')
   res.writeHead(200, { 'Content-Type': 'text/html' })

   new Promise((resolve, reject) => {
      switch(req.url){
         case '/weather':
            resolve(getWeatherReport)
            break
         case '/garbage':
            resolve(getGarbageSchedules())
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
