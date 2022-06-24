// d3.json("/api/v1.0/renewable_energy").then(function (jsonData) {
//     let data = jsonData;
//     console.log(data)


// });





function init() {
    // code that runs once (only on page load or refresh)
    d3.json("/api/v1.0/renewable_energy").then(function (jsonData) {
        let data = jsonData;
        console.log(data)
            
        

    
    });

    // this checks that our initial function runs.
    console.log("The Init() function ran")
    

    // create dropdown/select


    // run functions to generate plots
    createScatter('940')
    createBar('940')
    createSummary('940')

};

init()