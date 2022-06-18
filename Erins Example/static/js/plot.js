
d3.json("/api/v1.0/passengers").then(function(d){
    
    var count=[]
    var sexes=[];
    d.forEach(x => {
        if (sexes.includes(x.sex)){
            count[sexes.indexOf(x.sex)]+= 1;
        }
        else {
            sexes.push(x.sex);
            count.push(1);
        }
    })
    
    console.log(sexes);
    console.log(count);

    var data = [{
        x: sexes,
        y: count,
        type: 'bar'

    }];

    Plotly.newPlot('plot', data);
});