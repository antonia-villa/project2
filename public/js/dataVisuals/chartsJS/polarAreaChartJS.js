function polarAreaChart(mainTopic, dataSet, divId){
  
  // Reformat Data Values for Chart JS
  
  var labels = dataSet[0];
  var values = dataSet[1];
  var total = dataSet[2];

  // Select Maximum for y-axis
  var maxYAxis = Math.max.apply(null, values);
  var id = 'radarChart_'+divId

  $("#"+divId+"_viz").append('<canvas id='+id+' width="300px" height="150px"></canvas>');

  // Set Global Chart Properties
  Chart.defaults.global.defaultFontFamily = '"Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif';
  Chart.defaults.global.defaultFontColor = '#000000';
  
  var polarAreaChart =new Chart(document.getElementById(id), {
    type: 'polarArea',
    data: {
      labels: labels,
      datasets: [
        {
          label: "TEST",
          fill: true,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: values
        }
      ]
    },
    options: {
      title: {
        display: false
      }
    }
  });

};