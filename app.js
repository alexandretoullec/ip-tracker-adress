const button = document.querySelector('button')

const inputValue = document.querySelector('.input-search');

const loc = document.querySelector('.localisation-coord');
const ipAdree = document.querySelector('.ip-coord');
const timeZone = document.querySelector('.timezone-coord');
const isp = document.querySelector('.isp-coord');


// map





let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// console.log(map);

// end of map

// IP adress 
let apiKey = "d831ff40-900d-11ec-8f0f-e35fdbc72bb5"
// let apiKey = "at_xrM6Dtkk8WBPjfpZJuIBipKnQiWVY"
let url = "https://api.freegeoip.app/json/?apikey="+apiKey


const apiFunc = function init() {
    $.getJSON(url, function (response) {
        // console.log(ip);

        // recup key values
       let ipAdress = response.ip;
       let timeZoneResp = response.time_zone;
        let countryLocation = response.country_name;
        let cityLocation = response.city;
        let postalCode = response.zip_code;
        let ispResp = "Unavailable";
        let lat = response.latitude;
        let lng = response.longitude;
       

        // put recup values in HTML
        console.log(timeZone, ipAdress);
        loc.innerText=`${countryLocation}, ${cityLocation} ${postalCode}`;
        ipAdree.innerText=ipAdress;
        timeZone.innerText= `UTC ${timeZoneResp}`;
        isp.innerText=ispResp


        // display on map

        const mapLocation = () => {
            var markerIcon = L.icon({
              iconUrl: "images/icon-location.svg",
      
              iconSize: [46, 56], // size of the icon
              iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
            });
            map.setView([lat, lng], 17);
      
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: false,
            }).addTo(map);
      
            L.marker([lat, lng], { icon: markerIcon }).addTo(map);
          };
          mapLocation();

    })
}

apiFunc();
