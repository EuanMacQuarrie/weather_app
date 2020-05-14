//new date and time for each instance
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//event listener
document.getElementById('generate').addEventListener('click', getWeather);

//GET weather info from the OpenWeatherApi
const getAPIResponse =  async(call)=>{
    const apiResponse = await fetch(call);
      try {
        const data = await apiResponse.json();
        console.log(data);
        return data;
      }catch (error) {
        console.log('While fetching GET request from the API, an error occured: ', error);
      }
    };


//using API to get weather information
function getWeather(e){

    const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey = '&appid=fae203f2da64a84f26e786e6d2e38947';
    const units = '&units=metric';
    const zip = document.getElementById('zip').value;
    const postContent = document.getElementById('feelings').value;

    call = `${baseURL}${zip}${apiKey}${units}`;

    getAPIResponse(call)
    .then(function(newData){
            console.log(newData)
            makePost({temp: newData.main.temp, date: newDate, content: postContent});
    })
    .then(function(makePost){
        updateUI();
    });
};

//post the data from api
const makePost = async(data = {})=>{
    const response = await fetch("/newentry", {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': "application/json",
    },
    body: JSON.stringify(data),
    });
    try{
        const newPost = await response.json();
        console.log(newPost);
        return newPost;
        }   
        catch(error){
        console.log('An error has occured whilst trying to post: ',error())
        };
};

//updating the UI once response is receieved 
const updateUI = async(endpoint="/entries")=>{
    const getEntries = await fetch(endpoint);
      try{
        const entries = await getEntries.json()
        console.log(entries);
        document.getElementById('date').innerHTML = `<span class="far fa-clock"></span> ${entries[0].date}`;
        document.getElementById('temp').innerHTML = `<span class="fas fa-sun"></span> ${entries[0].temp}°C`;
        document.getElementById('content').innerHTML = `<span class="fas fa-pencil-alt"></span> ${entries[0].postContent}`;
      }catch(error){
        console.log('An error has occured whilst trying to post: ', error)
      };
  };