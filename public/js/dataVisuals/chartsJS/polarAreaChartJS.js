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
  
  // Set Chart Options
  var options = {
    responsive: true,
    legend: {
      display: true
    },
  tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItem, data) {
          return (data['datasets'][0]['data'][tooltipItem['index']]).toLocaleString('en');
        }
      }
    }
  }

  var polarAreaChart =new Chart(document.getElementById(id), {
    type: 'polarArea',
    data: {
      labels: labels,
      datasets: [
        {
          fill: true,
          backgroundColor: [
            "#102367",
            "#3F8DCA",
            "#D7C3B1",
            "#315495",
            "#BCBCBC",
            "#E4C75F",
            "#1C75A1",
            "#9FD5DF",
            "#71917C"],
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: values
        }
      ]
    },
    options: options
  });

};