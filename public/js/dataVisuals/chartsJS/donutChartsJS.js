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
        return args.percentage +'% ' + "(" + args.value.toLocaleString('en') +")";
    },
    arc: true,
    fontSize: 14,
    fontColor: '#000',
     overlap: true,
    fontFamily: '"Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif'
  }
}



  var barChart = new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          label: mainTopic,
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3cba9f"],
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







