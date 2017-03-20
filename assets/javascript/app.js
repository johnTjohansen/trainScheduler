  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAzNgdR7cC2LwR50IJGUPHJLl7MJqDLWVo",
    authDomain: "trainsched-1560a.firebaseapp.com",
    databaseURL: "https://trainsched-1560a.firebaseio.com",
    storageBucket: "trainsched-1560a.appspot.com",
    messagingSenderId: "354042713249"
  };
  firebase.initializeApp(config);

  // Variables
  // ========================================================================
  // Get a reference to the database service
  var database = firebase.database();

  var name = "";
  var dest = "";
  var tTime = "";
  var freq = "";

  // Event listeners
  // ========================================================================
  // When the submit button is pressed...
  $("button").on("click", function() {

  	// prevent form from trying to submit
    event.preventDefault();

    name = $("#trainName").val().trim();
    dest = $("#trainDest").val().trim();
    tTime = $("#trainTime").val().trim();
    freq = $("#trainFreq").val().trim();

    database.ref().push({
        name: name,
        dest: dest,
        tTime: tTime,
        freq: freq
    });

  });

  // Initial and when the database changes...
  database.ref().on("child_added", function(snapshot) {
  	console.log(snapshot.val());
  	var sv = snapshot.val();
  	var name = snapshot.val().name;
  	var dest = snapshot.val().dest;
  	var freq = snapshot.val().freq;
  	var firstTime = snapshot.val().tTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  	$("#trainInfo").append("<tr class='table-row'><td> " + name +
        " </td><td> " + dest + " </td><td> " + freq +    
        " </td><td> " + nextTrain + 
        " </td><td> " + tMinutesTillTrain + "</td></tr>");
        
  });

  // Functions
  // =========================================================================