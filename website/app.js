//user entry into app
let zip = document.getElementById('zip').value;
let place = document.getElementById('province').value;
let feel = document.getElementById('feelings').value;

//parameters of the API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '&appid=973075f402f8522528cf760c72270852';
const units = '&units=imperial';
let url = `${baseURL}zip=${zip},${place}${apiKey}${units}`;

//new date and time for each instance
let d = new Date();
let newDate = `${d.getMonth()} - ${d.getDate()} - ${d.getFullYear()}`;

//event listener
document.getElementById('generate').addEventListener('click', getPost);

//Chained promises
function getPost(e){
zip = document.getElementById('zip').value;
place = document.getElementById('province').value;
feel = document.getElementById('feelings').value;

    let url = `${baseURL}zip=${zip},${place}${apiKey}${units}`;
     getAPI(url)
     .then(function(NewPost){
         console.log(NewPost)
         makePost('/add', {temperature: NewPost.main.temp, feelings: feel, time: newDate});
     })
     .then(function(newPost){
         updateUI();
     });
    };
//using API to get weather information
const getAPI = async(url)=>{
    const apiResponse = await fetch (url);
        try{
            const data = await apiResponse.json();
            console.log(data)
            return data;
        }catch (error){
            console.log('Whilst making request, there was an error: ',error());
        }
};

//post the data from api
const makePost = async(url = "/add", data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    try 
        {NewData = await response.json();
        console.log(NewPost);
        return NewPost;
        }   
        catch(error){
        console.log('Whilst trying to post the data, an error occured: ',error())
        };
};
//updating the UI once response is receieved 
const updateUI = async(url = "/entries")=>{
    const getEntries = await fetch(url);
      try{
        const entries = await getEntries.json()
        console.log(entries);
        document.getElementById('date').innerHTML = `<span class="far fa-clock"></span> ${entries[0].date}`;
        document.getElementById('temp').innerHTML = `<span class="fas fa-sun"></span> ${entries[0].temperature}°C`;
        document.getElementById('content').innerHTML = `<span class="fas fa-pencil-alt">Your Previous Entries</span> ${entries[0].feelings}`;
      }catch(error){
        console.log('While updating UI an error occured: ', error)
      };
  };
