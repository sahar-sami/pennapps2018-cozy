window.onload = function (){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openhazards.com/GetEarthquakeProbability?q=San+Francisco,+CA&m=6.8&r=100', false);
	console.log(xhr.responseText);
    xhr.send();
    prob = earthquake(xhr.responseText);
    
    var risk = "mid";
    displayRisk(risk);
}

function earthquake(response){
    var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(response, "application/xml");
    var prob = null;
    do{
    prob = xmlDoc.getElementsByTagName("prob")[0].childNodes[0].nodeValue;
    }while (prob == undefined)
    var percent = parseFloat(prob.toString());
    console.log(percent);
    return percent;
}

function displayRisk(risk){
    document.getElementById('risk').innerHTML="<img id = 'dial' src = 'lowrisk.png'> This location has a " + risk + " risk of natural disasters.";
    document.getElementById('dial').src=risk + "risk.png";
}