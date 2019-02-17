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

//click event for getting train input
$("#add-train-btn").on('click', function (event) {
  event.preventDefault();

  //assign form data to variables and trim them
  var trainName = $('#train-name-input').val().trim();
  var trainDestination = $('#destination-input').val().trim();
  var trainFirstTime = $('#first-time-input').val().trim();
  var trainFrequency = $('#frequency-input').val().trim();

  //create a new train using object literal notation
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firsttime: trainFirstTime,
    frequency: trainFrequency
  };
  //take the new train info and push it to the database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firsttime);
  console.log(newTrain.frequency);
//alert that its been pushed through
  alert("Train successfully added");
//clear the input form
  $('#train-name-input').val("");
  $('#destination-input').val('');
  $('#first-time-input').val('');
  $('#frequency-input').val('');
});
//when a child is added to the firebase database
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirstTime = childSnapshot.val().firsttime;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirstTime);
  console.log(trainFrequency);

  var tFrequency = trainFrequency;
  var firstDepart = trainFirstTime;
  //console.log("train frequency: " + tFrequency);
  //console.log("first departure: " + firstDepart);

  
  //take the first depature time and convert it into hours and minutes
  var firstDepartConvert = moment(firstDepart, "HH:mm").subtract(1, "years");
  //console.log(firstDepartConvert);
  var timeDiff = moment().diff(moment(firstDepartConvert), "minutes");
  //console.log("DIFFERENCE IN TIME: " + timeDiff);
  var tRemainder = timeDiff % tFrequency;
  //console.log(tRemainder);
  var tMinutesTillTrain = tFrequency - tRemainder;
  //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  tArrival = moment(nextTrain).format("hh:mm");



  var newRow = $("<tr class='train'>").attr('data-first-time', trainFirstTime).attr('data-frequency', trainFrequency).append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text('every ' + trainFrequency + ' minutes'),
    $("<td>").attr('data-time-to-arrival', '').text(tArrival),
    $("<td>").attr('data-minutes-till-next', '').text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

});

setInterval(function () {

  var tableRowElements = $('.train');
//for each train class
  tableRowElements.each(function (i, element) {
    //get element data for the frequency
    var tFrequency = $(element).data('frequency');
    //get the element data for the first time the train departed
    var firstDepart = $(element).data('first-time');

    //console.log("train frequency: " + tFrequency);
    //console.log("first departure: " + firstDepart);

    var firstDepartConvert = moment(firstDepart, "HH:mm").subtract(1, "years");
    //console.log(firstDepartConvert);
    var timeDiff = moment().diff(moment(firstDepartConvert), "minutes");
    //console.log("DIFFERENCE IN TIME: " + timeDiff);
    var tRemainder = timeDiff % tFrequency;
    //console.log(tRemainder);
    var tMinutesTillTrain = tFrequency - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    tArrival = moment(nextTrain).format("hh:mm");
    
    var timeToArrive = tArrival;
   //set the elements time to arrival data attribute text based on the moment math
    $(element).find('[data-time-to-arrival]').text(timeToArrive);
//set the element we are going overs data attribute for minutes to next train
    $(element).find('[data-minutes-till-next]').text(tMinutesTillTrain);

  });
}, 3 * 1000);
