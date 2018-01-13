function donutChart(mainTopic, dataSet, divId){
  
  // Reformat Data Values for Chart JS
  
  var labels = dataSet[0];
  var values = dataSet[1];

  // Select Maximum for y-axis
  var maxYAxis = Math.max.apply(null, values);
  var id = 'donutChart_'+divId
  console.log('id', id);

  $("#"+divId+"_viz").append('<canvas id='+id+' width="200" height="100"></canvas>');


  var barChart = new Chart(document.getElementById(id), {
    type: 'doughnut',
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
    options: {
      legend: { display: false },
    }
});

}







