window.onload = function (){
    var risk = "high";
    document.getElementById('risk').innerHTML="<img id = 'dial' src = 'lowrisk.png'> This location has a " + risk + " risk of natural disasters.";
    document.getElementById('dial').src=risk + "risk.png";
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openhazards.com/GetEarthquakeProbability?q=San+Francisco,+CA&m=6.8&r=100', false);
	//xhr.responseType = 'blob';
	console.log(xhr.responseText);

xhr.send();}