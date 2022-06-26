// d3.json("/api/v1.0/renewable_energy").then(function (jsonData) {
//     let data = jsonData;
//     console.log(data)


// });





function init() {
    // code that runs once (only on page load or refresh)
    d3.json("/api/v1.0/renewable_energy").then(function (jsonData) {
        let data = jsonData;
        console.log(data)
            
        //Capturing the state name, for dropdown menus

        // define empty variable
        let states = [];
        for (let i = 0; i< data.length; i++) {
            states.push(data[i].state)
        };

        console.log(states)


        
        let dropDownMenu = d3.select("#selDataset");
    
        states.forEach(function (state) {
          dropDownMenu.append("option").text(state).property("value", state);
        });

        // using state = Illinois  from the data for initial plot
        let testSubject = data.filter((val) => val.state == 'Wyoming');
        console.log(testSubject);
        // taking the first array for sample state
        let result = testSubject[0];
         console.log(result)

        let energies = [];
        energies.push(result.solar)
        energies.push(result.wind)
        energies.push(result.hydro)
        energies.push(result.biopower)
        energies.push(result.geothermal)

        console.log(energies)
        let energy_label = ["Solar", "wind", "hydro", "biopower", "geothermal"]
       

    
    });

    // this checks that our initial function runs.
    console.log("The Init() function ran")
    

    // // create dropdown/select


    // // run functions to generate plots
    // createScatter('940')
    // createBar('940')
    createPie('Wyoming')
    createBar('Wyoming')

};

function createPie(state) {
    d3.json("/api/v1.0/renewable_energy").then(function (jsonData) {
        let data = jsonData;
        console.log(data)
            
        //Capturing the state name, for dropdown menus

        // define empty variable
        let states = [];
        for (let i = 0; i< data.length; i++) {
            states.push(data[i].state)
        };

        console.log(states)


        
        // let dropDownMenu = d3.select("#selDataset");
    
        // states.forEach(function (state) {
        //   dropDownMenu.append("option").text(state).property("value", state);
        // });

        // using state = Illinois  from the data for initial plot
        let testSubject = data.filter((val) => val.state == state);
        console.log(testSubject);
        // taking the first array for sample state
        let result = testSubject[0];
         console.log(result)

        let energies = [];
        energies.push(result.solar)
        energies.push(result.wind)
        energies.push(result.hydro)
        energies.push(result.biopower)
        energies.push(result.geothermal)

        console.log(energies)
        let energy_label = ["Solar", "Wind", "Hydro", "Biopower", "Geothermal"]

        let pie_data = [
            {
                values: energies,
                labels: energy_label,
                type: "pie",
                textinfo: "label + percent",
                textposition: "outside"
            }
        ]
        let layout = {
            height: 400,
            width: 400,
            margin: {"t": 50, "b": 0, "l": 50, "r": 40},
            showlegend: true
            };

        Plotly.newPlot("pie", pie_data, layout);
       

    
    });




}

function createBar(state) {
    d3.json("/api/v1.0/renewable_energy").then(function (jsonData) {
        let data = jsonData;
        console.log(data)
        //Capturing the state name, for dropdown menus
        // define empty variable
        let states = [];
        for (let i = 0; i< data.length; i++) {
            states.push(data[i].state)
        };
        console.log(states)
        // let dropDownMenu = d3.select("#selDataset");
        // states.forEach(function (state) {
        //   dropDownMenu.append("option").text(state).property("value", state);
        // });
        // using state = Illinois  from the data for initial plot
        let testSubject = data.filter((val) => val.state == state);
        console.log(testSubject);
        // taking the first array for sample state
        let result = testSubject[0];
         console.log(result)
        let tenergies = [];
        tenergies.push(result.total_consumed)
        tenergies.push(result.total_potential)
        tenergies.push(result.excess_capacity)
        console.log(tenergies)
        let tenergy_label = ["total_consumed", "total_potential", "excess_capacity"]
        let bar_data = [{
            x: tenergy_label,
            y: tenergies,
            type: "bar",
            text: tenergies.map(String),
            textposition: "auto",
            hoverinfo: "none",
            marker: {
              color: "rgb(158,202,225)",
              opacity: 0.6,
              line: {
                color: "rgb(8,48,107)",
                width: 1.5
              }
            }
          }
        ]
        let layout = {
            title: "State Potential Energy vs Energy Consumption",
            barmode: "stack",
            showlegend: true
            };
        Plotly.newPlot("bar", bar_data, layout);
    });

}


function optionChanged(newState) {
    createPie(newState)
    createBar(newState)
}


init()