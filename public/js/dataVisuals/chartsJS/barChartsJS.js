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
      title: {
          display: true,
          position: "top",
          text: mainTopic,
          fontSize: 16,
          fontColor: "#111"
      },
      legend: {
          display: false,
          position: "bottom",
      },
      scales: {
        xAxes: [{
          display: false
        }]
      }
  };

  var barChart = new Chart(document.getElementById(id), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: mainTopic,
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3cba9f"],
          data: values
        }
      ]
    },
    options: options
  });

}



