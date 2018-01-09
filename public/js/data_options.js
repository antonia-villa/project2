
$( "#topic" ).change(function() {
    var $option = $(this).find('option:selected');
    //Added with the EDIT
    var value = $option.val();
    selectTopic(value);
});



function selectTopic(topic) {

    // Get a reference to the foods select.
    var selectedTopic = $("#sub-topic");
    // Create a two dimension array containing foods for each group.

    var topics = [["income","Grapes","Oranges","Watermelon"],

                ["Brocolli", "Califlower","Spinach","Tomatoes"],

                ["Beef", "Chicken", "Turkey", "Tuna"]];

                 

    if ((topic >= 0) && (topic <= topics.length)) {
        selectedTopic.options.length = 0;
        // Index was in range, so access our array and create options.

        for (var i = 0; i < topics[topic - 1].length; i++) {

           selectedTopic.options[selectedTopic.options.length] = new Option(topics[topic - 1][i], i);
        }

 

    }

}
