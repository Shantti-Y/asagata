import dotenv from 'dotenv'
dotenv.config()

const MainURL = 'dev.shanttiy.com:3000'
const OpenWeatherMapURL = 'https://api.openweathermap.org/data/2.5/forecast?appid=' +  process.env.OPEN_WEATHER_MAP_API_KEY
const BinCalendarSrc = './models/fixtures/jsons/bin_calendars'

module.exports = { MainURL, OpenWeatherMapURL, BinCalendarSrc }
