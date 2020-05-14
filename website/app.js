//parameters of the API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=fae203f2da64a84f26e786e6d2e38947';
const units = '&units=metric'
let url = `${baseURL}${zip}${apiKey}${units}`;

//new date and time for each instance
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//event listener
document.getElementById('generate').addEventListener('click', getAPI);

//using API to get weather information
function getAPI(e){
        zipcode = document.getElementById('zip').value;
        country = document.getElementById('country').value;
        feel = document.getElementById('feelings').value;

    getWeather(baseURL, zipcode, country, apiKey)
        .then(function(userData){
            postData('/add', {date: newDate, temp: userData.main.temp, content: content})
        }).then (function (newData){
            updateUI
        })
};

//Chained promises
function getWeather(e){
    zip = document.getElementById('zip').value;
    console.log(zip)
    place = document.getElementById('country').value;
    console.log(country)
    feel = document.getElementById('feelings').value;
    console.log(feelings)

     getAPI(baseURL, zip, apiKey)
     .then(function(response){
         console.log(response)
         makePost('/add', {temperature: NewData.main.temp, feelings: feel, time: new Date});
     })
     .then(function(response){
         updateUI();
     });
    };

//post the data from api
const makePost = async(baseURL, zip, apiKey = '/add', data = {})=>{
    const response = await fetch(baseURL + zip + apiKey, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': application.json(),
    },
    body: JSON.stringify(data),
    });
    try 
        {NewData = await response.json();
        console.log(NewData);
        return NewData;
        }   
        catch(error){
        console.log('An error has occured whilst trying to post: ',error())
        };
};
//updating the UI once response is receieved 
const updateUI = async(baseURL, zip, apiKey = '/entries')=>{
    const getEntries = await fetch(baseURL + zip + apiKey);
      try{
        const entries = await getEntries.json()
        console.log(entries);
        document.getElementById('date').innerHTML = `<span class="far fa-clock"></span> ${entries[0].date}`;
        document.getElementById('temp').innerHTML = `<span class="fas fa-sun"></span> ${entries[0].location}°C`;
        document.getElementById('content').innerHTML = `<span class="fas fa-pencil-alt"></span> ${entries[0].feel}`;
      }catch(error){
        console.log('An error has occured whilst trying to post: ', error)
      };
  };