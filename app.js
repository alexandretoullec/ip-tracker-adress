// Dom elements
const subBtn = document.querySelector('button')
const inputValue = document.querySelector('.input-search');
const loc = document.querySelector('.localisation-coord');
const ipAdree = document.querySelector('.ip-coord');
const timeZone = document.querySelector('.timezone-coord');
const isp = document.querySelector('.isp-coord');


// IP adress and API from ipinfo.com

let url = "https://ipinfo.io/json?token=aa78bd10781816"


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
        let timeZoneResp = response.timezone;
        let countryLocation = response.country;
        let cityLocation = response.city;
        let postalCode = response.postal;
        let ispResp = "Not yet implanted";
        let position = response.loc.split(",");
        
        
        let lat = parseFloat(position[0]);
        let lng = parseFloat(position[1]);
               
        
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
            
            url= "https://ipinfo.io/"+ipInput+"?token=aa78bd10781816"
            
            
            return apiFunc()
          }
        })
    })
}

apiFunc();