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
    // pull values from HTML input form
    name = $("#trainName").val().trim();
    dest = $("#trainDest").val().trim();
    tTime = $("#trainTime").val().trim();
    freq = $("#trainFreq").val().trim();

    // write new train info at end of firebase
    database.ref().push({
        name: name,
        dest: dest,
        tTime: tTime,
        freq: freq
    });

    // clear data boxes on HTML input form
    $("#trainName").val("");
    $("#trainDest").val("");
    $("#trainTime").val("");
    $("#trainFreq").val("");

  });

  // On first run and when the database changes...
  database.ref().on("child_added", function(snapshot) {
  	// save firebase record's values
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
    var nextHhmm = moment(nextTrain).format("HH:mm");
    console.log("ARRIVAL TIME: " + nextHhmm);

//  	$("#trainInfo").append("<tr class='table-row'><td> " + name +
    $("#trainInfo").append("<tr><td> " + name +
        " </td><td> " + dest + " </td><td> " + freq +    
        " </td><td> " + nextHhmm + 
        " </td><td> " + tMinutesTillTrain + "</td></tr>");
     
  });

  // Functions
  // =========================================================================