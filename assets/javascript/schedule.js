// Initialize Firebase
var config = {
    apiKey: "AIzaSyCuSYUGTQAgpgB7QTzvgOCeQcmjQIVfxbs",
    authDomain: "appstatic-25f43.firebaseapp.com",
    databaseURL: "https://appstatic-25f43.firebaseio.com",
    projectId: "appstatic-25f43",
    storageBucket: "appstatic-25f43.appspot.com",
    messagingSenderId: "154496598061"
  };
  firebase.initializeApp(config);

  var name; 
  var destination;
  var frequency;
  var nextArrival;
  var munitesAway;
  
        
  var database = firebase.database();  


  function getMonthsWorked(date){

    var convDate = moment(time, "HH:mm");
    var monthsWorked = Math.abs(convDate.diff(moment(),"months"));

    console.log("Months Worked:" + monthsWorked);
    return monthsWorked;

  }

  function createRow(){

    var newRow = $("<tr>");
    var nameEle = $("<td>");
    nameEle.text(name);  

    var destinationEle = $("<td>");
    destinationEle.text(role);

    var frequencyEle = $("<td>");
    frequencyEle.text(sDate);        

    var rateEle = $("<td>");
    rateEle.text(monthlyRate); 

    var mWorked = $("<td>");
    mWorked.text(mWorked);
    
    var totalEle = $("<td>");
    totalEle.text(totalBilled);
      
    newRow.append(nameEle);
    newRow.append(roleEle);
    newRow.append(dateEle);
    newRow.append(mWorked);
    newRow.append(rateEle);  
    newRow.append(totalEle);
    $("#employee-info").append(newRow);
    
  }


//submitting new member
$("#submit").on("click",function(event){

  console.log("butt-load clicked");
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  fTrainTime = $("#first-trainTime-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  console.log(name);

  var dataObj = {
    name: name,
    destination:destination,
    fTrainTime: fTrainTime,
    frequency: frequency
  };

  database.ref("employees").push(dataObj);


});     

database.ref("employees").on("child_added",function(snapshot){
  
  var recentUser = snapshot.val();
  console.log(recentUser.name);
  console.log(recentUser.role);
  console.log(recentUser.startDate);
  console.log("Monthly Rate: " + recentUser.monthlyRate);
      
  
  name = recentUser.name;
  role = recentUser.role;
  sDate = recentUser.startDate;
  monthlyRate = recentUser.monthlyRate;
  monthsWorked = getMonthsWorked(sDate);
  totalBilled = monthsWorked * monthlyRate;
  
  console.log("Months Worked In Loading: " + monthsWorked);
        
  createRow();//pulls data from global vars and makes the new table for employee

});     