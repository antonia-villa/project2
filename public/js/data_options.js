// Load Main Topics
$(document).ready(function(){
    selectTopic(topics);

})

function selectTopic(topics) {
    var topic = $("#topic1");

    for (i in topics) {
        var option = $('<option/>');
        option.attr({ 'value': topics[i].subTopic}).text(topics[i].topic).attr({'data-topicId':topics[i].id});
        $(topic).append(option);
    }
};


$( "#topic1" ).change(function() {
    //$('#topic2').css( "display", "block" )
    var topic1 = $( "#topic1" ).data('topicId');
    selectAvailableTopics(topic1, topics);
});

function selectAvailableTopics(topic1,topics){
    var topic2 = $("#topic2");

        for (i in topics){
            console.log('if part1', topics[i].topic)
            console.log('if part 2', topic1);
            if (topics[i].id !== topic1){
                var option = $('<option/>');
                option.attr({ 'value': topics[i].subTopic}).text(topics[i].topic).attr({'data-topicId':topics[i].id});;
                $(topic2).append(option);
            } 
    }
}