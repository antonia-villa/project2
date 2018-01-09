// Load Main Topics
$(document).ready(function(){
    var topic1 = $("#topic1");
    var topic2 = $("#topic2");

    selectTopic(topic1, topics);
    selectTopic(topic2, topics);

})

function selectTopic(topic, topics) {

    for (i in topics) {
        var option = $('<option/>');
        option.attr({ 'value': topics[i].subTopic}).text(topics[i].topic);
        $(topic).appends(option);
    }


};


// Load Main Topics
// $(document).ready(function(){
//     $('#subTopic').css( "display", "none" )
//     selectTopic(topics);
// })

// function selectTopic(topics) {
//     var topic = $("#topic");

//     for (i in topics) {
//         var option = $('<option/>');
//         option.attr({ 'value': topics[i].id}).text(topics[i].topic);
//         $('#topic').append(option);
//     }


// };

// $( "#topic" ).change(function() {
//     $('#subTopic').css( "display", "block" )
//   var topicId = $( "#topic" ).val();
//   selectSubTopic(topicId);

// });

// function selectSubTopic(topicId){
//     var subTopic = $("#subTopic");

//     var options = topics[topicId].subTopic;
//     for (i in options){
//         var option = $('<option/>');
//         option.attr({ 'value': Object.values(options[i])}).text(Object.keys(options[i]));
//         $('#subTopic').append(option);
//     }
// }