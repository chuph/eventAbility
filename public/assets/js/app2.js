
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

function geoAllow (position) {

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
   
    var fronta = $("<h4>").addClass('front1');
    var frontb = $("<h4>").addClass('front2');
    var frontc = $("<h4>").addClass('front3');

    var linka = $('<a>').addClass('linka');
    var linkb = $('<a>').addClass('linkb');
    var linkc = $('<a>').addClass('linkc');
    
    fronta = fronta.append(linka);
    frontb = frontb.append(linkb);
    frontc = frontc.append(linkc);

    var imgOne = $("<img>");
    var imgTwo = $("<img>");
    var imgTre = $("<img>");
    
    $(linka).text(titleOne).attr({
                'href': bleu.events[changer].url,
                'target': '_blank'
            });
    $(linkb).text(titleTwo).attr({
                'href': bleu.events[changer2].url,
                'target': '_blank'
            });
    $(linkc).text(titleTre).attr({
                'href': bleu.events[changer3].url,
                'target': '_blank'
            });

    if (bleu.events[changer].logo !== null) {
    imgOne.addClass('image').attr('src', bleu.events[changer].logo.original.url);
    }

    if (bleu.events[changer2].logo !== null) {
    imgTwo.addClass('image').attr('src', bleu.events[changer2].logo.original.url);
    }

    if (bleu.events[changer3].logo !== null) {
    imgTre.addClass('image').attr('src', bleu.events[changer3].logo.original.url);
    }

    $('<h1>Popular Events in Your Area</h1>').appendTo('#startUp');
    $("#showOne").prepend(fronta, imgOne);
    $("#showTwo").prepend(frontb, imgTwo);
    $("#showTre").prepend(frontc, imgTre);
    console.log(fronta);
        
        });

}

function geoDeny (position) {

    token2 = 'NHGJJNM3WETFRYYCXJ6H';
    urlStart = "https://www.eventbriteapi.com/v3/events/search/?token=" + token2 + "&expand=venue&";

    urlStart += $.param({
        'q': "music",
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
   
    var fronta = $("<h4>").addClass('front1');
    var frontb = $("<h4>").addClass('front2');
    var frontc = $("<h4>").addClass('front3');

    var linka = $('<a>').addClass('linka');
    var linkb = $('<a>').addClass('linkb');
    var linkc = $('<a>').addClass('linkc');
    
    fronta = fronta.append(linka);
    frontb = frontb.append(linkb);
    frontc = frontc.append(linkc);

    var imgOne = $("<img>");
    var imgTwo = $("<img>");
    var imgTre = $("<img>");
    
    $(linka).text(titleOne).attr({
                'href': bleu.events[changer].url,
                'target': '_blank'
            });
    $(linkb).text(titleTwo).attr({
                'href': bleu.events[changer2].url,
                'target': '_blank'
            });
    $(linkc).text(titleTre).attr({
                'href': bleu.events[changer3].url,
                'target': '_blank'
            });

    if (bleu.events[changer].logo !== null) {
    imgOne.addClass('image').attr('src', bleu.events[changer].logo.original.url);
    }

    if (bleu.events[changer2].logo !== null) {
    imgTwo.addClass('image').attr('src', bleu.events[changer2].logo.original.url);
    }

    if (bleu.events[changer3].logo !== null) {
    imgTre.addClass('image').attr('src', bleu.events[changer3].logo.original.url);
    }

    $('<h1>Popular Events Around the Country</h1>').appendTo('#startUp');
    $("#showOne").prepend(fronta, imgOne);
    $("#showTwo").prepend(frontb, imgTwo);
    $("#showTre").prepend(frontc, imgTre);
    console.log(fronta);
        
        });

}

function getLocation() {

        navigator.geolocation.getCurrentPosition(geoAllow, geoDeny);
       
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

function InvervalTimer(callback, interval) {
        var timerId, startTime, remaining = 0;
        var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

       this.pause = function () {
            if (state != 1) return;

           remaining = interval - (new Date() - startTime);
            window.clearInterval(timerId);
            state = 2;
        };

       this.resume = function () {
            if (state != 2) return;

           state = 3;
            window.setTimeout(this.timeoutCallback, remaining);
        };

       this.timeoutCallback = function () {
            if (state != 3) return;

           callback();

           startTime = new Date();
            timerId = window.setInterval(callback, interval);
            state = 1;
        };

       startTime = new Date();
        timerId = window.setInterval(callback, interval);
        state = 1;
    }

var timer = new InvervalTimer(function () {
        nextBackground();
    }, 5000);


function nextBackground() {
    var width = window.outerWidth;
    if (width < 720){
 $('#formHolder').css({
                'background': 'none'
})}
else {
    form.css({
        'background': backgrounds[current = ++current % backgrounds.length],
        'background-size': '100%'

  });}

  // setTimeout(nextBackground, 3000);
}

// var timing = setTimeout(nextBackground, 3000);
form.css({
    'background': backgrounds[0],
    'background-size': '100%'

});

window.onresize = function() {

  var width = window.outerWidth;
    console.log(width);

  if (width < 720) {

      $('#formHolder').css({
                'background': 'none'


      });
       // clearTimeout(timing);

   // } else if (width >= 720) {
            // nextBackground();
       // setTimeout(nextBackground, 3000);        
  }
};

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