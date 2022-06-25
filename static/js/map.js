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

    // console.log('min, max:', min, max);
    console.log(statesData)

function getColor(d) {
    return d < 0  ? "#e5f5e0":
           d < 1000000 ? "#c7e9c0":
           d < 5000000 ? "#a1d99b":
           d < 10000000 ? "#74c476":
           d < 20000000 ? "#41ab5d":
           d < 30000000 ? "#238b45":
           d < 50000000 ? "#006d2c":
                          " #00441b"                                   
}        

function style(feature) {
    return {
        fillColor: getColor(feature.properties.excess_capacity),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

// adding styes
L.geoJson(statesData, { style: style }).addTo(map);

// legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    // create a div tag for each element
    var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += "<p> Energy Excess Capacity (Gwhs MM)</p>";
        grades = [ -100000,0, 1000000, 5000000, 10000000, 20000000, 30000000, 50000000]
        labels = [];
        grades1 = ["<0", "0-1", "1-5", "5-10", "10-20", "20-30", "30-40", "50+"]

        
    // loop through intervals and generate labels
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + 
            grades1[i] + '<br>' ;
        }        
        return div;
    };
legend.addTo(map);
    
// add mouseover event
function onEachFeature(feature, layer) {
    layer.on('mouseover', function(e) {
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 1
        });
        
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            this.bringToFront();
        }
        layer.openPopup();
    }).on('mouseout', function(e) {
        geojson.resetStyle(e.target);
        layer.closePopup();
    });
        
    // popup variable
    var popupHtml = "<h5>" + (feature.properties.name) + "</h5>" + 
    "<p><strong>Total Potential Renewable Energy: </strong>" + feature.properties.total_potential + "</p>" + 
    "<p><strong>Total Energy Consumed: </strong>" + (feature.properties.total_consumed) + "</p>" + 
    "<p><strong>Energy Excess Capacity: </strong>" + (feature.properties.excess_capacity) + "</p>";

    layer.bindPopup(popupHtml, { className: 'popup', 'offset': L.point(0, -20) });
}

//  adding styles on each feature
geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

});