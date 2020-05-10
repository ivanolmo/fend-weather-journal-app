/* Global Variables */
const apiKey = '&appid=74c3de506cd0392c67d65851ac5d0cc8';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const weatherFormat = '&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Add event listener to button on page
document.getElementById('generate').addEventListener('click', buttonClick);


// GET function to retrieve weather API data
const getWeather = async (url = '') => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('error', error)
    }
};