/* Global Variables */
const apiKey = '&appid=74c3de506cd0392c67d65851ac5d0cc8';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const weatherFormat = '&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Add event listener to button on page
document.getElementById('generate').addEventListener('click', buttonClick);

// callback function when button is clicked, submits data to page
function buttonClick (event) {
    event.preventDefault();
    const zipCode = document.getElementById('zip').value;
    getWeather(baseURL+zipCode+apiKey+weatherFormat)
        .then(
            data => {
                const content = document.getElementById('feelings').value;
                console.log(content);
                return postData('/api/post', {
                    temp: data.main.temp,
                    date: newDate,
                    content: content
                })
            })
                .then(
                    function () {
                        return getWeather('/api/get')
                    }
                )
                .then(
                    async () => {
                        const request = await fetch('/api/get');
                        try {
                            const newData = await request.json();
                            document.getElementById('date').innerHTML = newData.date;
                            document.getElementById('temp').innerHTML = newData.temp;
                            document.getElementById('content').innerHTML = newData.content;
                        } catch (error) {
                            console.log('error', error)
                        }
                    }
                )
        .then(
            setTimeout(function () {
            clearForm();
        }, 300));
}

// POST function to store data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        return await response.json();
    } catch (error) {
        console.log('error', error)
    }
};

// GET function to retrieve weather API data
const getWeather = async (url = '') => {
    const response = await fetch(url);
    try {
        return await response.json();
    } catch (error) {
        console.log('error', error)
    }
};

// function to clear input fields
const clearForm = () => {
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value = '';
};