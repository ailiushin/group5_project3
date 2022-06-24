// creaing base map from leaflet code
var map = L.map('map').setView([37.8, -96], 4);

//adding title layer
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//  adding data to the map
L.geoJson(statesData).addTo(map);


// //  data route
// var data_url = "/api/v1.0/renewable_energy";

// // open data with D3 and then go through the data and join with leaflet's state data
// d3.json(data_url).then(function(data){

   
//     for(var i = 0; i < data.length; i++) {
//         for(var j = 0; j < data.length; j++) {
//             if(data[i].state === statesData.features[j].properties.name) {
//                 statesData.features[j].properties.excess_capacity = data[i].excess_capacity;
//                 statesData.features[j].properties.total_potential = data[i].total_potential;
//                 statesData.features[j].properties.total_consumed = data[i].total_consumed;
//             }
//         }
//     };

//     // // determine min and max for color scale
//     // var min = Math.min.apply(null, data.excess_capacity);
//     // var max = Math.max.apply(null, data.excess_capacity);

//     // console.log('min, max:', min, max);
    
//     console.log(statesData)
// });