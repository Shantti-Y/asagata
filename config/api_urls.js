import dotenv from 'dotenv'
dotenv.config()

const MainURL = 'http://dev.shanttiy.com:3000/'
const OpenWeatherMapURL = 'https://api.openweathermap.org/data/2.5/forecast?appid=' +  process.env.OPEN_WEATHER_MAP_API_KEY
//
module.exports = { MainURL, OpenWeatherMapURL }
