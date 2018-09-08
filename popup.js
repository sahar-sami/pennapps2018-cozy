window.onload = function (){
    var risk = "mid";
    document.getElementById('risk').innerHTML="<img id = 'dial' src = 'lowrisk.png'> This location has a " + risk + " risk of natural disasters.";
    document.getElementById('dial').src=risk + "risk.png";
}