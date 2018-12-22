
// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCuSYUGTQAgpgB7QTzvgOCeQcmjQIVfxbs",
    authDomain: "appstatic-25f43.firebaseapp.com",
    databaseURL: "https://appstatic-25f43.firebaseio.com",  
    storageBucket: "appstatic-25f43.appspot.com",
    
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding New train 
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#train-name-input").val().trim();
  var empDestination = $("#destination-input").val().trim();
  var empFirstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").format("X");
  var empFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: empName,
    destination: empDestination,
    firstTrain: empFirstTrain,
    frequency: empFrequency
  };

  // Uploads new train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  //alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empDestination = childSnapshot.val().destination;
  var empFirstTrain = childSnapshot.val().firstTrain;
  var empFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(empName);
  console.log(empDestination);
  console.log(empFirstTrain);
  console.log(empFrequency);

  // Prettify the train first time 
  var empfirstTrainPretty = moment.unix(empFirstTrain).format("HH:mm");

  // Calculate the next train time
  var empNextArrival = moment().diff(moment(empFirstTrain, "X"), "minutes");
  console.log(empNextArrival);

  // Calculate the next arrival time
 // var empMinutesAway = empFrequency * empFirstTrain; 
 // console.log(empMinutesAway);

 
    // Assumptions
  var tFrequency = childSnapshot.val().frequency;

    // Time is 
  var firstTime = childSnapshot.val().firstTrain;

 // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTimeConverted = moment(firstTime, "HH:mm");
 console.log(firstTimeConverted);

 // Current Time
 var currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart (remainder)
 var tRemainder = diffTime % tFrequency;
 console.log(tRemainder);

 // Minute Until Train
 var tMinutesTillTrain = tFrequency - tRemainder;
 console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
 empNextArrival = moment(nextTrain).format("hh:mm");
 //empMinutesAway = moment().diff(empNextArrival,"minutes")
 empMinutesAway = tMinutesTillTrain;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empDestination),
    $("<td>").text(empfirstTrainPretty),
    $("<td>").text(empFrequency),
    $("<td>").text(empNextArrival),
    $("<td>").text(empMinutesAway)
  );
  

  // Append the new row to the table
  $("#train-table tbody").append(newRow);
});




    