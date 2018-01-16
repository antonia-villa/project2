function donutChart(mainTopic, dataSet, divId){
  
  // Reformat Data Values for Chart JS
  
  var labels = dataSet[0];
  var values = dataSet[1];
  var total = dataSet[2];

  // Select Maximum for y-axis
  var maxYAxis = Math.max.apply(null, values);
  var id = 'donutChart_'+divId

  $("#"+divId+"_viz").append('<canvas id='+id+' width="100px" height="50px"></canvas>');

  // Set Global Chart Properties
  Chart.defaults.global.defaultFontFamily = '"Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif';
  Chart.defaults.global.defaultFontColor = '#000000';

  // Set Chart Options
  var options = {
    responsive: true,
    legend: {
      display: true
    },
  // Plug-In for Charts JS to assign labels to donut charts
  pieceLabel: {
    render: function (args) {
        return args.percentage +'% ';
    },
    arc: true,
    fontSize: 14,
    fontColor: '#000',
    overlap: false,
    fontFamily: '"Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif'
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



  var donutChart = new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          label: mainTopic,
          backgroundColor: [
            "#315495",
            "#c5c6c2",
            "#102367",
            "#3F8DCA",
            "#9FD5DF",
            "#E4C75F",
            "#1C75A1",
            "#71917C",
            "#c5c6c2"
          ],
          borderWidth: 2,
          hoverBorderWidth: 0,
          data: values
        }
      ]
    },
    hoverBorderWidth: 10,
    options: options
  });

}







