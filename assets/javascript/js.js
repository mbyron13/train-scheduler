 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAVPWQ_QKSudxpXmVTc5UtSyTagXGb6fAM",
    authDomain: "train-activity-527f0.firebaseapp.com",
    databaseURL: "https://train-activity-527f0.firebaseio.com",
    projectId: "train-activity-527f0",
    storageBucket: "train-activity-527f0.appspot.com",
    messagingSenderId: "955581655122"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on('click', function(event){
    event.preventDefault();

    var trainName = $('#train-name-input').val().trim();
    var trainDestination = $('#destination-input').val().trim();
    var trainFirstTime = $('#first-time-input').val().trim();
    var trainFrequency = $('#frequency-input').val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firsttime: trainFirstTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firsttime);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    $('#train-name-input').val("");
    $('#destination-input').val('');
    $('#first-time-input').val('');
    $('#frequency-input').val('');
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().firstime;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstTime);
    console.log(trainFrequency);
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency)
      );
    
      // Append the new row to the table
      $("#train-table > tbody").append(newRow);
    });