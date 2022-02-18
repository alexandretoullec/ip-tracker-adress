const subBtn = document.querySelector('button')

const inputValue = document.querySelector('.input-search');

const loc = document.querySelector('.localisation-coord');
const ipAdree = document.querySelector('.ip-coord');
const timeZone = document.querySelector('.timezone-coord');
const isp = document.querySelector('.isp-coord');


// IP adress 
let apiKey = "d831ff40-900d-11ec-8f0f-e35fdbc72bb5";


let url = "https://api.freegeoip.app/json/?apikey="+apiKey

//show map

let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);



const apiFunc = function init() {
    $.getJSON(url, function (response) {
               
        // recup key values
        let ipAdress = response.ip;
        let timeZoneResp = response.time_zone;
        let countryLocation = response.country_name;
        let cityLocation = response.city;
        let postalCode = response.zip_code;
        let ispResp = "Not yet implanted";
        let lat = response.latitude;
        let lng = response.longitude;
       
        // put recup values in HTML
        ipAdree.innerText=ipAdress;
        loc.innerText=`${countryLocation}, ${cityLocation} ${postalCode}`;
        timeZone.innerText= `UTC ${timeZoneResp}`;
        isp.innerText=ispResp
      
        // marker making
        let iconMap = L.icon({
        iconUrl:"images/icon-location.svg",
        iconSize:     [35, 50], // size of the icon
        })

        // center icon
        map.setView([lat, lng]);
          
        // set marker on the map
        L.marker([lat, lng],{icon: iconMap}).addTo(map)
        .bindPopup('Here you are!!!')
        .openPopup();
        
        
        
        // search and validate IP

        const regEx = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

        subBtn.addEventListener('click',(e)=>{
          e.preventDefault();
          // console.log("clicked");
          if(!inputValue.value.match(regEx)){
            // console.log("match");
            alert("please, enter a valid IP adress")

          }else{
            let ipInput = inputValue.value;
            url = "https://api.freegeoip.app/json/"+ipInput+"?apikey="+apiKey;
            return apiFunc()
          }
        })

        
    })
}





apiFunc();