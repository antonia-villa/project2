function barChart(mainTopic, dataSet, divId){
  
  // Reformat Data Values for Chart JS
  
  var labels = dataSet[0];
  var values = dataSet[1];
  console.log('labels', labels);
  console.log('values', values);

  // Select Maximum for y-axis
  var maxYAxis = Math.max.apply(null, values);
  var id = 'barChart_'+divId
  console.log('id', id);

  $("#"+divId+"_viz").append('<canvas id='+id+' width="300" height="150"></canvas>');
  
  var options = {
      responsive: true,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          barPercentage: 0.5
        }]
      },
      elements: {
        rectangle: {
          borderSkipped: 'bottom',
        }
    },
    legend: {
   labels: {
      generateLabels: function(chart) {
         var labels = chart.data.labels;
         var dataset = chart.data.datasets[0];
         var legend = labels.map(function(label, index) {
            return {
               datasetIndex: 0,
               fillStyle: dataset.backgroundColor && dataset.backgroundColor[index],
               strokeStyle: dataset.borderColor && dataset.borderColor[index],
               lineWidth: dataset.borderWidth,
               text: label
            }
         });
         return legend;
      }
   }
}
  };

  var barChart = new Chart(document.getElementById(id), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: false,
          backgroundColor: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#CFECF9', '#7F7F7F', '#BCBD22', '#17BECF'],
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



