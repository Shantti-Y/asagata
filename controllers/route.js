const http = require('http')
const fs = require('fs')
const { getWeatherReport } = require('./api_docs/weather_reports.js')
const { getGarbageSchedules } = require('./api_docs/garbage_schedules.js')
const port = 3000

http.createServer( (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*')
   res.writeHead(200, { 'Content-Type': 'text/html' })

   let res_msg
   let req_msg = req.url
   switch(req_msg){
      case '/weather':
         res_msg = getWeatherReport()
         break
      case '/garbage':
         res_msg = getGarbageSchedules()
         break
      default:
         res_msg = 'hello'
         break
   }

   res.write(JSON.stringify(res_msg))
   res.end()
}).listen(port)

console.log('Server running at port ' + port + '...')
