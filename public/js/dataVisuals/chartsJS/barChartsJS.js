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
          labelString: mainTopic
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
  };

  // Create Bar Chart
  var barChart = new Chart(document.getElementById(id), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: false,
          backgroundColor: ["#102367",
            "#3F8DCA",
            "#D7C3B1",
            "#315495",
            "#BCBCBC",
            "#E4C75F",
            "#1C75A1",
            "#9FD5DF",
            "#71917C"
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



