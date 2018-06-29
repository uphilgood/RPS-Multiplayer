$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyCDJUrZlD2VGIB7IFCmu06mdIyW9z1WIWM",
        authDomain: "rpsgame-9de6a.firebaseapp.com",
        databaseURL: "https://rpsgame-9de6a.firebaseio.com",
        projectId: "rpsgame-9de6a",
        storageBucket: "",
        messagingSenderId: "124850522007"
    };
    firebase.initializeApp(config);


    var database = firebase.database();

    var player1 = {}
    var player2 = {}
    var firstUserId = ''
    var firstUser = ''
    var secondUser = ''
    var choiceArray = ["Rock", "Paper", "Scissors"]

    function checkWinner() {
        if (player1.choice === player2.choice) {
            alert("tie")
            $("#buttons-view").show()
        } if (player1.choice === "Rock" && player2.choice === "Scissors") {
            player1.wins++
            database.ref(firstUserId + "/wins").set(player1.wins)
            $("#winnertext").html("<strong>Holy guacamole!  " + player1.name + ", you win! You have " + player1.wins + " points!</strong>" )
            $("#winnertext").show()
            $("#playagain").show()

            
        } if (player1.choice === "Rock" && player2.choice === "Paper") {
            player2.wins++
            database.ref(secondUserId + "/wins").set(player2.wins)
            $("#winnertext").html("<strong>Holy guacamole!  " + player2.name + ", you win! You have " + player2.wins + " points!</strong>" )
            $("#winnertext").show()
            $("#playagain").show()
            
        } if (player1.choice === "Paper" && player2.choice === "Scissors") {
            player2.wins++
            database.ref(secondUserId + "/wins").set(player2.wins)
            $("#winnertext").html("<strong>Holy guacamole!  " + player2.name + ", you win! You have " + player2.wins + " points!</strong>" )
            $("#winnertext").show()
            $("#playagain").show()
           
        } if (player1.choice === "Paper" && player2.choice === "Rock") {
            player1.wins++
            database.ref(firstUserId + "/wins").set(player1.wins)
            $("#winnertext").html("<strong>Holy guacamole!  " + player1.name + ", you win! You have " + player1.wins + " points!</strong>" )
            $("#winnertext").show()
            $("#playagain").show()
            
        } if (player1.choice === "Scissors" && player2.choice === "Rock") {
            player2.wins++
            database.ref(secondUserId + "/wins").set(player2.wins)
            $("#winnertext").html("<strong>Holy guacamole!  " + player2.name + ", you win! You have " + player2.wins + " points!</strong>" )
            $("#winnertext").show()
            $("#playagain").show()
            
        } if (player1.choice === "Scissors" && player2.choice === "Paper") {
            player1.wins++
            database.ref(firstUserId + "/wins").set(player1.wins)
            $("#winnertext").html("<strong>Holy guacamole!  " + player1.name + ", you win! You have " + player1.wins + " points!</strong>" )
            $("#winnertext").show()
            $("#playagain").show()
            
        }
    }

    $("#playagain").on("click", function(event) {
        $("#player1form").show()
        $("#buttons-view").show()
        $("#player2form").hide()
        $("#playagain").hide()
        $("#winnertext").hide()
    })

    $("#chatmessage").on("click", function(event) {
        player1.chat = $("#chatmessage").val().trim(),
        database.ref(firstUserId + "/chat").push(player1.chat)
    })

    $("#player1submit").on("click", function (event) {
        event.preventDefault();

        // Grabbed values from text boxes
        player1 = {
            name: $("#exampleInput1").val().trim(),
            wins: 0,
            loss: 0,
            chat: [],
            choice: '',
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }

        var firstUser = database.ref().push(player1);
        firstUserId = firstUser.key
        console.log(firstUserId)
        $("#player1form").hide()


        choiceArray.forEach(choice => {

            var a = $("<button>")
            a.addClass("btn btn-primary").attr

            ({
                id: "p1" + choice,
                data: choice
            }).text(choice)

            $('#buttons-view').append(a)
            console.log(choice)
        })
        localStorage.setItem('player1', JSON.stringify(player1));
    });
    
    var retrievedObject1 = localStorage.getItem('player1', JSON.stringify(player1));
    // $("#user1choice").html("<strong>" + player1.name + ", choose your weapon!</strong>" )
    // $("#user1choice").show()

    $(document).on("click", ".btn-primary", function () {
        player1.choice = this.getAttribute("data")
        database.ref(firstUserId + "/choice").set(player1.choice);
        console.log(player1.choice)
        $("#player2form").show()
        $("#buttons-view").hide()
        $("#player1form").hide()
        if (player2) {
            // $("#player2form").hide()
            $("#buttons-view2").show()
        }
    });

    $(document).on("click", ".btn-secondary", function () {
        player2.choice = this.getAttribute("data")
        database.ref(secondUserId + "/choice").set(player2.choice);
        console.log(player2.choice)
        $("#player2form").hide()
        $("#buttons-view2").hide()
        checkWinner()
    });

    $("#player2submit").on("click", function (event) {
        event.preventDefault();

        player2 = {
            name: $("#exampleInput2").val().trim(),
            wins: 0,
            loss: 0,
            chat: [],
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }
        var secondUser = database.ref().push(player2);
        secondUserId = secondUser.key
        console.log(secondUserId)

        choiceArray.forEach(choice => {

            var a = $("<button>")
            a.addClass("btn btn-secondary").attr

            ({
                id: "p2" + choice,
                data: choice
            }).text(choice)

            $('#buttons-view2').append(a)
            console.log(choice)
        })
        $("#player2form").hide()
        localStorage.setItem('player2', JSON.stringify(player2));
    });

    var retrievedObject2 = localStorage.getItem('player2', JSON.stringify(player2));


    database.ref().on("value", snapshot => {
        // storing the snapshot.val() in a variable for convenience
        var u = snapshot.val();
        if (u[firstUserId]) {
            $("#player1form").hide()
        }
        // $('#p1score').append(u.name + ": " + u.wins)
        //   if (u.key === firstUserId ) {
        //       $("#player1form").hide()
        //   }

        // console.log(u)

          $("#chatmessage").append("<ul>" + u.chat + "</td>"); 
                
            //     $("#chatmessage").append("tr><td class='employeeName'>" + sv.name +
            // " </td><td class='role'> " + sv.role +
            //   " </td><td class='startDate'> " + sv.startDate +
            //     " </td><td class='monthsWorked'> " + sv.monthsWorked + " </td><td class='monthlyRate'>" + sv.monthlyRate + "</td><td class='totalBilled'> " + sv.totalBilled + "</td></tr>"); 

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    function intialize() {
        $("#player2form").hide()
        $("#winnertext").hide()
        $("#playagain").hide()
        // $("#user1choice").hide()


    }
    intialize()

    

    if (retrievedObject1) {
        $("#player1form").hide()
        $("#player2form").show()
    }
    if (retrievedObject2) {
        $("#player1form").hide()
        $("#player2form").hide()
    }
});