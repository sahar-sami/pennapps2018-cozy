window.onload = function (){
    var highrisk = 0, midrisk = 0, lowrisk = 0;
    var risk;
    prob = eqrequest();
    if (prob >= 25){highrisk += 1;}
    else if (prob >= 5 && prob < 25) {midrisk += 1;}
    else {lowrisk += 1;}
    
    if (highrisk >= 1){
        risk = "high";
        }
    else if (midrisk >=1){
        risk = "mid";
    }
    else{
        risk = "low";
    }
    displayRisk(risk);
}

function eqrequest(){
    var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openhazards.com/GetEarthquakeProbability?q=Tokyo,+Japan&m=6&r=100', false);
	console.log(xhr.responseText);
    xhr.send();
    prob = earthquake(xhr.responseText);
    return prob;
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

$.get("https://www.mydomain.com/?url=https://www.google.com", function(response){
	alert(response)
});
