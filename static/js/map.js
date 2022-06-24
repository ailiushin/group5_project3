// creaing base map from leaflet code
var map = L.map('map').setView([37.8, -96], 4);

//adding title layer
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//  adding data to the map
L.geoJson(statesData).addTo(map);

//  data route
var data_url = "/api/v1.0/renewable_energy";

// open data with D3 and then go through the data and join with leaflet's state data
d3.json(data_url).then(function(data){
   
    for(var i = 0; i < data.length; i++) {
        for(var j = 0; j < data.length; j++) {
            if(data[i].state === statesData.features[j].properties.name) {
                statesData.features[j].properties.excess_capacity = data[i].excess_capacity;
                statesData.features[j].properties.total_potential = data[i].total_potential;
                statesData.features[j].properties.total_consumed = data[i].total_consumed;
            }
        }
    };

    // determine min and max for color scale
    let excess_capacity_list = data.map(i => i.excess_capacity)
    var min = Math.min.apply(null, excess_capacity_list);
    var max = Math.max.apply(null, excess_capacity_list);

    console.log('min, max:', min, max);
});

// function getColor(d) {
//     return d < 0  ? "#e5f5e0":
//            d < 1000000 ? "#c7e9c0":
//            d < 5000000 ? "#a1d99b":
//            d < 10000000 ? "#74c476":
//            d < 20000000 ? "#41ab5d":
//            d < 30000000 ? "#238b45":
//            d < 40000000 ? "#006d2c":
//                           " #00441b"                                   
// }     

// function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.excess_capacity),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }

// L.geoJson(statesData, {style: style}).addTo(map);