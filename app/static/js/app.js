
$( document ).ready(function() {
    let host_endpoint = 'http://127.0.0.1:5000/'
    var sub_domain = document.location.host;
    let data_object = 'mushrooms';

    // $('#app_title').html (sub_domain);

    $.ajaxSetup({
        headers: { 'authentication-method': 'none' }
    });

    function load_content() {
        $.ajax({
            url: host_endpoint + data_object,
            contentType: 'application/json',
        }).done(function(data){
            array_data = JSON.parse(data); // to array

            display_data = "<table class='table table-hover table-bordered '><tbody>"
            // display_data = display_data.concat("<thead><tr>", "<td>", 'name', "</td>", "</tr></thead>");
            for (i in array_data){
                // console.log(array_data[i].name);
                display_data = display_data.concat("<tr>", "<td>", array_data[i].name, "</td>", "</tr>")
            }
            display_data = display_data.concat("</tbody><table>")

            $('#content').html (display_data);
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
    set_ui_display();
});


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


function set_ui_display(){
    // If user signed in (authenticated) then display username, sign-out button, and data.
    // else, display sign-in button & hide the rest.
    if (token.userIdToken.length > 0) {
        // signed-in
        document.getElementById('username').style.visibility = 'visible';
        document.getElementById('username').innerHTML = 'marco@mail.com';
        document.getElementById('signin').style.visibility = 'hidden';
        document.getElementById('signout').style.visibility = 'visible';
        // console.log(document.getElementById('username').style.visibility);
    } else {
        // signed-out
        document.getElementById('username').style.visibility = 'hidden';
        document.getElementById('username').innerHTML = '';
        document.getElementById('signin').style.visibility = 'visible';
        document.getElementById('signout').style.visibility = 'hidden';
        // console.log(document.getElementById('username').style.visibility);
    }
}


// This is passed into the backend to authenticate the user.
var token = {
    value: '',
    get userIdToken(){
        return this.value;
    },
    set userIdToken(value){
        this.value = value;
        console.log('userIdToken has chanaged value to ' + this.value);
    }
}