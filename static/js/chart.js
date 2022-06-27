function init() {
  // code that runs once (only on page load or refresh)
  d3.json("/api/v1.0/renewable_energy").then(function (jsonData) {
      let data = jsonData;
      console.log(data)
          
 
    let sum = 0
      for (let i = 0; i< data.length; i++) {
          sum += (data[i].solar)
      };

      console.log(sum);

      let twind = 0
      for (let i = 0; i< data.length; i++) {
          twind += (data[i].wind)
      };

      console.log(sum1)
      
      let thydro = 0
      for (let i = 0; i< data.length; i++) {
          thydro += (data[i].hydro)
      };

      console.log(thydro);

      let tbiopower = 0
      for (let i = 0; i< data.length; i++) {
          tbiopower += (data[i].biopower)
      };

      console.log(tbiopower);

      let tgeothermal = 0
      for (let i = 0; i< data.length; i++) {
          tgeothermal += (data[i].geothermal)
      };

      console.log(tgeothermal);
      

    })
  }
        var options = {
            series: [399809805, 49759763, 488278, 31646047, 258929],
            chart: {
            height: 390,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                }
              }
            }
          },
          colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#13d8AA'],
          labels: ["Solar", "Wind", "Hydro", "Biopower", "Geothermal"],
          legend: {
            show: true,
            floating: true,
            fontSize: '12px',
            position: 'above',
            offsetX: 160,
            offsetY: 15,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0
            },
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
              vertical: 3
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                  show: false
              }
            }
          }]
          }
        
  
          var chart = new ApexCharts(document.querySelector("#chart"), options);
          chart.render();
      



