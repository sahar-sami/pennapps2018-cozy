window.onload = function (){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openhazards.com/GetEarthquakeProbability?q=San+Francisco,+CA&m=6.8&r=100', false);
	//xhr.responseType = 'blob';
	console.log(xhr.responseText);
    xhr.send();
    prob = earthquake(xhr.responseText);
   // console.log(prob);
    var risk = "mid";
    displayRisk(risk);
}

function earthquake(xml){
    
    return prob;
}

function displayRisk(risk){
    document.getElementById('risk').innerHTML="<img id = 'dial' src = 'lowrisk.png'> This location has a " + risk + " risk of natural disasters.";
    document.getElementById('dial').src=risk + "risk.png";
}