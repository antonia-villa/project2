---
# PROJECT 2
# DATA SOURCE:
https://uscensusbureau.github.io/citysdk/
---

# Technical Requirements
- Deployed on Heroku	
- At least 1 API (OR sockets OR OAuth - ask if in doubt)	
- At least 2 Models	Log in works	
- Sign up automatically logs me in	
- Sensible error messages for bad login info	
- At least 1 GET route	
- At least 1 POST route	
- At least 1 DELETE route	
- At least 1 PUT route	
- Appropriate use of Github
- README is included	
- gitignore properly set up	Site is functional	
- Effort was put into design

# Technologies Used
- Node.js
- Express
- jQUERY
- ChartsJS
- ChartsJS PLUG IN: pieceLabel
- Bootstrap

# Approach Taken
- Goal: Give the user the ability to compare data sets and create a log of their obversations in the trends
- Started with identifying the appropriate data source to enable multiple visuals through a single API
- Chose the government Census Bureau API through the use of the tool CitySDK
- Set up practice route extracting data from the API
- Grouped available API data into sub data sets to be accessed by users based on larger data topic
- Created data cleansing functions to reformat data for data visuals
- Created and re-routed to practice data set to create visuals
- Built visuals using D3
- Identified linear data structure - changed charting library to learn ChartsJS to match simpler data structures
- Built multiple charts using ChartsJS and assigned charts to each data topic 
- Created routes and ability for users to comment on data sets
- Created tags for data sets related to location and year
- Enabled users ability to search through data tags to view contributions based on similar data input

# Progress Log
![alt tag](http://res.cloudinary.com/diemchbam/image/upload/v1516075690/DataEntryForm_V1_qaqeaz.png "Initial Data Entry Form _V1")
![alt tag](http://res.cloudinary.com/diemchbam/image/upload/v1516075690/dataView_V1_zletvb.png "Initial Data Display _V1")
![alt tag](http://res.cloudinary.com/diemchbam/image/upload/v1516075690/allTags_V1_smgx7i.png "Initial Data Tags Display_V1")
![alt tag](http://res.cloudinary.com/diemchbam/image/upload/v1516075690/dataView_V3_sfhlwl.png "Data Display_V2")
![alt tag](http://res.cloudinary.com/diemchbam/image/upload/v1516075690/dataView_V2_eyqvdo.png "Data Display_V3")


# Issues Encounter throughout the Approach
- Slow response from API caused issues building and manipulating data set
- Attempting to apply D3 to linear data sets was not a practical use of the library
- Learning ChartsJS after implenting D3
- Creating error handling functions in the API calls

# Fun Stuff
- Learning ChartsJS
- Understanding the structure of government data


# Unsolved Problems
- ChartsJS formatting could use updating
- Error handling functions should be dispersed throughout application
- Loading page for slow API response should be added

# Next Steps
- Refactor ChartsJS to add more fitting charts for each data type
- Ensure no chart is repeated twice with each request
- Create loading page to be displayed while API is firing
- Display more informative error messages