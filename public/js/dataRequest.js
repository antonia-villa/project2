
/// Trying out the other form of the request from client side
console.log('got into data Request')

$("#inputData").submit(function(e){
    e.preventDefault();
    callAPI();
});

function callAPI() {
    console.log('gotinto inputdata function')
    var sdk = new CitySDK();
    var census = new CensusModule('94638ba40362ec3eb7cc258e2dcc5a8d40d7d00');

    var request = {
        "level": "state",
        "state": "AK",
        "sublevel": true,
        "variables": [
            "B24124_407E",
            "age",
            "commute_time",
            "commute_time_carpool",
            "commute_time_other"
        ]
    }

    census.apiRequest(request, function (response) {

        //Outputs the raw JSON text
        $("#rawOutput").append("<p>"+JSON.stringify(response)+"</p>");
    });
    // var zipcode1 = 
    // var zipcode2 = 
    // var year = $("input[type=radio][name=year]:checked").val();
    // var topic1Id = 
    // var topic2Id =

};