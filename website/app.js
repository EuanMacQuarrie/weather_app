//user entry into app
let zip = document.getElementById('zip').value;
let place = document.getElementById('province').value;
let feel = document.getElementById('feelings').value;

//parameters of the API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=fae203f2da64a84f26e786e6d2e38947';

//new date and time for each instance
let d = new Date();
let newDate = d.getMonth() + '.' - d.getDate() + '.' + d.getFullYear();

//using API to get weather information
const getAPI = async (baseURL, zip, apiKey) => {
    const response = await fetch (baseURL + zip + apiKey, {
        method: 'GET',
});

try {
    const data = await response.json();
    return data;
    }
catch (error){
    console.log('Whilst making request, there was an error: ',error());
}};

//event listener
document.getElementById('generate').addEventListener('click', getPost);

//Chained promises
function getPost(e){
zip = document.getElementById('zip').value;
place = document.getElementById('province').value;
feel = document.getElementById('feelings').value;

    let url = `${baseURL}zip=${zip},${place}${apiKey}`;
     getAPI(baseURL, zip, apiKey)
     .then(function(NewData){
         console.log(NewData)
         makePost('/add', {temperature: NewData.main.temp, feelings: feel, time: new Date});
     })
     .then(function(NewData){
         updateUI();
     });
    };

//post the data from api
const makePost = async(url = '/add', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
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
const updateUI = async(url = "/entries")=>{
    const getEntries = await fetch(url);
      try{
        const entries = await getEntries.json()
        console.log(entries);
        document.getElementById('date').innerHTML = `<span class="far fa-clock"></span> ${entries[0].d}`;
        document.getElementById('temp').innerHTML = `<span class="fas fa-sun"></span> ${entries[0].place}°C`;
        document.getElementById('content').innerHTML = `<span class="fas fa-pencil-alt">Your Previous Entry</span> ${entries[0].feel}`;
      }catch(error){
        console.log('An error has occured whilst trying to post: ', error)
      };
  };