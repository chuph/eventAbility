
$(document).ready(function(){
    
/*********************************
MATERIALIZE & LOAD FORMATING
*********************************/

$('select').material_select();
$('.datepicker').pickadate();
$('#eventHolder').hide();


/*********************************
EVENTBRITE API INITIAL LOAD
*********************************/ 
var lat;
var lon;
var urlStart;
var token2;

function eventAPI (position) {

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    lat = lat.toString();
    lon = lon.toString();
    

    token2 = 'NHGJJNM3WETFRYYCXJ6H';
    urlStart = "https://www.eventbriteapi.com/v3/events/search/?token=" + token2 + "&expand=venue&";

    urlStart += $.param({
        'q': "music",
        'location.latitude': lat,
        'location.longitude': lon,
        'location.within': '20mi',
        'sort_by': 'best',
        'start_date.range_start': moment().format('YYYY-MM-DDThh:mm:ss'),
        'start_date.range_end' : moment().add(1, 'week').format('YYYY-MM-DDThh:mm:ss')
    });

    $.ajax({
        method: "GET",
        url: urlStart
        }).done(function(bleu) {
            console.log(bleu);

    var changer = Math.floor((Math.random() * bleu.events.length));
    var changer2 = Math.floor((Math.random() * bleu.events.length));
    var changer3 = Math.floor((Math.random() * bleu.events.length));

    var titleOne = bleu.events[changer].name.text;
    var titleTwo = bleu.events[changer2].name.text;
    var titleTre = bleu.events[changer3].name.text;
   
    var fronta = $("<h4>");
    var frontb = $("<h4>");
    var frontc = $("<h4>");

    var imgOne = $("<img>");
    var imgTwo = $("<img>");
    var imgTre = $("<img>");

    fronta.append(titleOne).addClass('front');
    frontb.append(titleTwo).addClass('front');
    frontc.append(titleTre).addClass('front');

    imgOne.addClass('image').attr('src', bleu.events[changer].logo.original.url);
    imgTwo.addClass('image').attr('src', bleu.events[changer2].logo.original.url);
    imgTre.addClass('image').attr('src', bleu.events[changer3].logo.original.url);

    $('<h1>Popular Events Around the Country</h1>').appendTo('#startUp');
    $("#showOne").prepend(fronta, imgOne);
    $("#showTwo").prepend(frontb, imgTwo);
    $("#showTre").prepend(frontc, imgTre);
    console.log(fronta);
        
        });


        

}

function getLocation() {

        navigator.geolocation.getCurrentPosition(eventAPI);

       
    } 


if (navigator.geolocation) {

    getLocation();

    
        
}






/*********************************
FIREBASE
*********************************/   

    var config = {
    apiKey: "AIzaSyDp5uLcLT626edyPAnj3wNW-H4ZS1m3JZc",
    authDomain: "eventability-4e0eb.firebaseapp.com",
    databaseURL: "https://eventability-4e0eb.firebaseio.com/",
    projectId: "eventability-4e0eb",
    storageBucket: "eventability-4e0eb.appspot.com",
    messagingSenderId: "52655380758"
    };
    
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function(event) {
        event.preventDefault();

        zip = $("#zip").val().trim();
        email = $("#email").val().trim();
        interest = $("#category").val();

        database.ref().push({
            zip: zip,
            email: email,
            interest: interest
        });
    });

    database.ref().on("value", function(snapshot) {

        if (snapshot === undefined) {

            database.ref().push({
                zip: zip,
                email: email,
                interest: interest
            });
        }
        else {
            var sv = snapshot.val();
            var svArr = Object.keys(sv);
            var lastIndex = svArr.length - 1;
            var lastKey = svArr[lastIndex];
            var lastObj = sv[lastKey];

        }
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


/*************************
MAIN HEADLINE SLIDESHOW
*************************/

var form = $('#formHolder');
var backgrounds = ['url("assets/img/concert.jpg") 0 0 no-repeat', 'url("assets/img/hang_out3.jpg") 0 0 no-repeat', 'url("assets/img/rock_climbing.jpg") 0 0 no-repeat'];
var current = 0;

function nextBackground() {
    form.css({
        'background': backgrounds[current = ++current % backgrounds.length],
        'background-size': '100%'

    });

    setTimeout(nextBackground, 10000);
}

setTimeout(nextBackground, 10000);
form.css({
    'background': backgrounds[0],
    'background-size': '100%'

});

/*****************
FORM VALIDATION
******************/
var zip;
var zipValid = false;
var dateValid = false;

$('.errorHolder').hide();
$('#form').parsley();

$('#zip').on('blur', function () {

    zip = $('#zip').val().trim();
    var smartToken = 'nCkB0jk3NcAOlKBPbnOF';
    var smartAuth = '7040a637-7f2a-c512-85b2-a09906fa6824';
    var smartURL = 'https://us-zipcode.api.smartystreets.com/lookup?';
    smartURL += $.param({
        'auth-id': smartAuth,
        'auth-token': smartToken,
        'zipcode': zip
    });

    $.ajax({
        method: 'GET', 
        url: smartURL
    }).done(function (smart) {
        console.log(smart);
        console.log('Smart Valid: ' + smart[0].status);
        console.log(typeof smart[0].status);

        if(smart[0].status == "invalid_zipcode" || smart[0].status == "blank") {
            console.log('Enter Valid Zip Code');
            $('.errorHolder').show();
            zipValid = false;
           
        } else {
            console.log('Thats a good zip');
            $('.errorHolder').hide();
            zipValid = true;

            if (dateValid == true) {
                $('#submit').removeClass('disabled');
            }
            
        }


    }); // END SMARTYSTREET AJAX DONE

}) // END ZIP BLUR EVENT

$('.picker__holder').on('click', '.picker__clear', function () {
    $('#date').val('');
    $('#dateSection label').addClass('red-text');
    dateValid = false;

}); // END PICKER CLEAR CLICK

$('.picker__holder').on('click', '.picker__close', function () {

    var dateValue = $('#date').val();
    if(dateValue == "") {
        $('#dateSection label').addClass('red-text');
        dateValid = false;
        
    } else {
        $('#dateSection label').removeClass('red-text');
        dateValid = true;

        if (zipValid == true) {
            $('#submit').removeClass('disabled');
        }
        
    }
}); // END PICKER CLOSE CLICK


/*************************************************
EVENTBRITE API, GOOGLE MAPS API, SMARTYSTREETS API
*************************************************/

$('#submit').on('click', function (e) {
    e.preventDefault();
    $('#submit').addClass('disabled');

    
    var email = $('#email').val().trim();
    var distance = $('#distance').val().trim();
    var category = $('#category').val();
    category = category.toString();
    var startDate = moment().format('YYYY-MM-DDThh:mm:ss');
    var endDate = moment($('#date').val()).format('YYYY-MM-DDThh:mm:ss');
    var dateRange = startDate + "-" + endDate;



// EVENTBRITE API

    var token = 'NHGJJNM3WETFRYYCXJ6H';
    var url = "https://www.eventbriteapi.com/v3/events/search/?token=" + token + "&expand=venue&";
    url += $.param({
        'q': category,
        'location.within': distance + "mi",
        'location.address': zip,
        'start_date.range_start': startDate,
        'start_date.range_end': endDate

    });

    $.ajax({
    method: "GET",
    url: url
    }).done(function(res) {
    console.log(res);
    
        function randomEvent() {

            if (res.events.length == 0) {
                $('#eventHolder').show();
                var $noEvent = $('<h1>').append('Try your search again!');
                var $noEventImg = $('<img>');
                $noEventImg.attr('src', '../eventAbility/assets/img/no-results.jpg');
                $('#eventDesc').append($noEventImg, $noEvent);
                $('#eventLocDetails').empty();
                $("#mapps").attr("src", "");

            } else {

                var randomizer = Math.floor((Math.random() * res.events.length));

                var eAddr = res.events[randomizer].venue.address.address_1;
                if (eAddr !== null) {
                    eAddr = eAddr.replace(/&/g, "and");
                }

                var eName = res.events[randomizer].venue.name;
                var city = res.events[randomizer].venue.address.city;
                var state = res.events[randomizer].venue.address.region;
                var title = res.events[randomizer].name.text;
                var description = res.events[randomizer].description.text;
                var date = res.events[randomizer].start.local;
                var formatDate = moment(date).format('MMMM Do YYYY, h:mm a');
                if (res.events[randomizer].venue.address.address_1 !== null) {
                    var address = res.events[randomizer].venue.address.address_1 + " ";
                }   
                if (res.events[randomizer].venue.address.address_2 !== null) {
                    address += res.events[randomizer].venue.address.address_2;
                }

                var postal = res.events[randomizer].venue.address.postal_code;
                var $eventTitle = $('<h1>');
                
                var $eventDes = $('<p>');
                var $eventDate = $('<p>');
                var $locName = $('<p>');
                var $locAddr = $('<p>');
                var $locRegion = $('<p>');
                var randomizerButton = $('<button>');
                var $buttonHolder = $('<div>');
                
                console.log("Randomizer: " + randomizer);

                $eventTitle.append(title).addClass('title');
                $eventDes.append(description).addClass('description');
                $eventDate.append(formatDate).addClass('date');
                $('#eventDesc').append($eventTitle, $eventDate, $eventDes);

                if (res.events[randomizer].logo !== null) {
                    var $eventImg = $('<img>');
                    $eventImg.attr('src', res.events[randomizer].logo.original.url);
                    $('.date').after($eventImg);
                }

                $locName.append(eName).addClass('locName');
                $locAddr.append(address);

                $locRegion.append(city + ", " + state + " ");
                if (postal !== null) {
                    $locRegion.append(postal);
                }

                $('#eventLocDetails').prepend($locName, $locAddr, $locRegion);
               
                randomizerButton.addClass('randomizer btn').append('New Event');
                $buttonHolder.append(randomizerButton).addClass('buttonHolder');

                $('#eventHolder').prepend($buttonHolder);
                $('#eventHolder').show();

            // GOOGLE MAPS API
                var mapURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDZO4fsXLv5ODYYBldfEUCCF63RmouiFWU&q=" + eAddr + "," + city + "+" + state;

                $("#mapps").attr("src", mapURL);

            } // END IF/ELSE EVENT EXISTENCE    
            
        } // END randomEvent FUNCTION

        randomEvent();
      
        $(document).on('click', '.randomizer', function () {

            $('#eventDesc, #eventLocDetails').empty();
            $('.buttonHolder').remove();

            randomEvent();

        }); // END CLICK ON RANDOMIZER BUTTON

       

    }); // END EVENTBRITE AJAX DONE


    $('#zip').val('');
    $('#email').val('');
    $('#category').val('');
    $('#date').val('');
    $('#eventDesc, #eventLocDetails, .buttonHolder').empty();

}); // END CLICK ON SUBMIT





}); // END READY