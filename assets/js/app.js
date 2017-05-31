// Initialize Firebase
var config = {
	apiKey: "AIzaSyBA9b-XYLS984YH8tBzTVH4IncJogW5PoY",
	authDomain: "train-a746c.firebaseapp.com",
	databaseURL: "https://train-a746c.firebaseio.com",
	projectId: "train-a746c",
	storageBucket: "train-a746c.appspot.com",
	messagingSenderId: "600960358572"
};

firebase.initializeApp(config);

//declare datbase variable
var database = firebase.database();

function getNextArrival (firstTrainTime, frequency) {
	// http://momentjs.com/docs/#/manipulating/subtract/
	// based on the first train time
	// the frequency at which the train arrives
	// and the current time
	// return the arrival time of the next train
	// For example:
	// If the first train comes at 1:00 PM
	// and the frequency is 30 minutes
	// and it is currently 4:04 PM
	// then I should return 4:30 PM
	var now = moment();

	// Currently returns a JavaScript date
	return now.toDate();
}

function getMinutesUntilNextArrival (nextTrainTime) {
	// return the time difference 
	// between next arrival and right now
	var now = moment();

	return 100;
}

//adding click handler function to submit the data
$("#addTrainBtn").on("click", function(e) {
		e.preventDefault();

		//declare variable for train input fields
		var trainName = $("#trainNameInput").val();
		var lineName = $("#lineInput").val();
		var trainDestination = $("#destinationInput").val();
		var trainFrequency = $("#frequencyInput").val();
		var firstTrainTime = $('#trainTimeInput').val();

		database.ref().push({ //database refererence for firebase and pushes the data to the DOM
			dbTrainName: trainName,
			dbLine: lineName,
			dbDestination: trainDestination,
			dbFrequency: trainFrequency,
			dbTrainTime: firstTrainTime
		})

		$("#trainNameInput").val("");
		$("#lineInput").val("");
		$("#destinationInput").val("");
		$("#frequencyInput").val("");
		// TODO: clear train time too
});

//function that adds the data to firebase database
database.ref().on("child_added", function (snapshot) {
	console.log(snapshot.val());

	var trainLine;//variable to retrieve the data in the line field
	
	if ( snapshot.val().dbLine ==null)
	{
		trainLine= "";
	}
	else
	{
		trainLine = snapshot.val().dbLine;
	}

	
	var nextArrival = getNextArrival(snapshot.val().dbTrainTime);

	$("#trainTable").append("<tr>" + 
		"<td>" + snapshot.val().dbTrainName + "</td>" +
		"<td>" + trainLine + "</td>" +
		"<td>" + snapshot.val().dbDestination + "</td>" + 
		"<td>" + snapshot.val().dbFrequency + "</td>" +
		"<td>" +  moment(nextArrival).format('LTS') + "</td>" +
		"<td>" + getMinutesUntilNextArrival(nextArrival) + "</td>" +
	" </tr>");
});

