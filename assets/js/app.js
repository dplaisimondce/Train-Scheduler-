
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

  //adding click handler function to submit the data

  $("#addTrainBtn").on("click", function(e) {
      e.preventDefault();

      //declare variable for train input fields
      var trainName = $("#trainNameInput").val();
      var lineName = $("#lineInput").val();
      var trainDestination = $("#destinationInput").val();
      var trainFrequency = $("#frequencyInput").val();

      database.ref().push({ //database refererence for firebase and pushes the data to the DOM

        dbTrainName: trainName,
        dbLine: lineName,
        dbDestination: trainDestination,
        dbFrequency: trainFrequency
      })

      $("#trainNameInput").val("");
      $("#lineInput").val("");
      $("#destinationInput").val("");
      $("#frequencyInput").val("");


  })
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

      

      $("#trainTable").append("<tr>" + 
        "<td>" + snapshot.val().dbTrainName + "</td>" +
        "<td>" + trainLine + "</td>" +
         "<td>" + snapshot.val().dbDestination + "</td>" + "<td>" + snapshot.val().dbFrequency + "</td> </tr>");
        

    });

    
