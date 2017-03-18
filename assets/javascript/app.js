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

  // When the database changes...
  database.ref().on("value", function(snapshot) {

  	var sv = snapshot.val();

  });

  // Functions
  // =========================================================================