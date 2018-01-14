function barChart(mainTopic, dataSet, divId){
  
  // Reformat Data Values for Chart JS
  
  var labels = dataSet[0];
  var values = dataSet[1];
  var total = dataSet[2];

  // Select Maximum for y-axis
  var maxYAxis = (Math.max.apply(null, values)+100);
  var id = 'barChart_'+divId

  // Append Chart to Canvas
  $("#"+divId+"_viz").append('<canvas id='+id+' width="300" height="150"></canvas>');
  
  // Set Global Chart Properties
  Chart.defaults.global.defaultFontFamily = '"Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif';
  Chart.defaults.global.defaultFontColor = '#000000';

  // Set Chart Options
  var options = {
    responsive: true,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: mainTopic + ' (in #s)'
        },
        ticks: {
          suggestedMax: maxYAxis+100,
          // Convert the number to a string and add commas
         callback: function(value, index, values) {
            return value.toLocaleString('en');
          }
        }
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
                text: toTitleCase(label)
              }
           });
          return legend;
        }
      }
    },
    animation: {
      duration: 1,
      onComplete: function () {
        var chartInstance = this.chart,
            ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(Math.floor((data/total)*100)+'%', bar._model.x, bar._model.y - 5);
            });
        });
      }
    }
  };

  // Create Bar Chart
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



