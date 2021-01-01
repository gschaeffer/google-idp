
$( document ).ready(function() {
    let host_endpoint = 'http://127.0.0.1:5000/'
    var app_url = document.location.href;
    let data_object = 'mushrooms';


    $('#signin').click(signin);
    $('#signout').click(signout);

    set_ui_display();

    // $('#app_title').html (app_url);

    $.ajaxSetup({
        headers: { 'Authorization': 'Bearer ' + token.userIdToken }
    });

    function load_content() {
        $.ajax({
            url: host_endpoint + data_object,
            contentType: 'application/json',
        }).done(function(data){
            array_data = JSON.parse(data); // to array

            display_data = "<table class='table table-hover table-bordered '><tbody>"
            for (i in array_data){
                // console.log(array_data[i].name);
                display_data = display_data.concat("<tr>", "<td>", array_data[i].name, "</td>", "</tr>")
            }
            display_data = display_data.concat("</tbody><table>")

            $('#data-display').html (display_data);
            $('#timestamp').html(calcTime(6));
        }).fail(function(data, status){
            console.log('Uh oh, ' + status);
            $('#timestamp').html("Error");
        }).always(function(){
            document.title = data_object
            $('#data_title').html (sentenceCase(data_object));
        });
    }

    load_content();
});

function set_ui_display(){
    // If user signed in (authenticated) then display username, sign-out button, and data content.
    // else, display sign-in button & hide the rest.
    if (token.userIdToken.length > 0) {
        // signed-in
        document.getElementById('content-data').style.visibility = 'block';
        document.getElementById('content-auth').style.display = 'none';
        document.getElementById('username').style.visibility = 'visible';
        document.getElementById('username').innerHTML = 'test@domain.com';
        document.getElementById('signin').style.display = 'none';
        document.getElementById('signout').style.visibility = 'visible';
    } else {
        // signed-out
        document.getElementById('content-data').style.display = 'none';
        document.getElementById('content-auth').style.visibility = 'block';
        document.getElementById('username').style.visibility = 'hidden';
        document.getElementById('username').innerHTML = '';
        document.getElementById('signin').style.visibility = 'visible';
        document.getElementById('signout').style.visibility = 'hidden';
    }
}


// *****************************************************************************************
// * Auth functions & placeholders below.
// *****************************************************************************************

// This is passed into the backend to authenticate the user.
var token = {
    value: '',
    get userIdToken(){
        return sessionStorage.getItem("token");
    },
    set userIdToken(value){
        sessionStorage.setItem("token", value);
        if (value.length > 1) {
            console.log('userIdToken has chanaged value to ' + value);
        } else {
            console.log('userIdToken is cleared.');
        }
    }
}

function signin(){
    token.userIdToken = "no-auth";
}

function signout(){
    token.userIdToken = "";
}


// *****************************************************************************************
// * Helper functions below.
// *****************************************************************************************

function sentenceCase (str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


function calcTime(offset) {
    d = new Date();
    // convert to msec, add local time zone offset, get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // create new Date object for different city using supplied offset
    nd = new Date(utc + (3600000*offset));
    // return time as a string
    return nd.toLocaleString();
}