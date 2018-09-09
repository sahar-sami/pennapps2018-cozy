window.onload = function (){
    /*Get the address from the website in the form of a string*/
    var address;
    var highrisk = 0, midrisk = 0, lowrisk = 0;
    var risk;
    var tprob = trequest();
    if (tprob >= 50){
        highrisk +=1;
        document.getElementById('tornado').innerHTML = "High risk of tornadoes.";
    }
    else if (tprob >= 20 && tprob <50){
        midrisk +=1;
        document.getElementById('tornado').innerHTML = "Slight risk of tornadoes.";
    }
    else {
        lowrisk += 1;
        document.getElementById('tornado').innerHTML = "Low risk of tornadoes.";
    }
    var eqprob = eqrequest(address);
    
    if (eqprob >= 25){
        highrisk += 1;
        document.getElementById('earthquake').innerHTML = "High risk of earthquakes.";
    }
    else if (eqprob >= 5 && eqprob < 25) {
        midrisk += 1;
        document.getElementById('earthquake').innerHTML = "Slight risk of earthquakes.";
    }
    else if (eqprob == null){
        document.getElementById('earthquake').innerHTML = "";
    } // say that data couldn't be found
    else {
        lowrisk += 1
        document.getElementById('earthquake').innerHTML = "Low risk of earthquakes.";
    }
    
    var hprob = hrequest();
    
    if (highrisk >= 1){
        risk = "high";
        }
    else if (midrisk >=1){
        risk = "slight";
    }
    else{
        risk = "low";
    }
    displayRisk(risk);
    console.log(window.location.hostname);
}


function eqrequest(address){
   //Manipulate address so that it can be used here
    var q = "San Francisco, CA";
    q = q.replace(' ', '+')
    var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openhazards.com/GetEarthquakeProbability?q=' + q + '&m=6&r=100', false);
	console.log(xhr.responseText);
    xhr.send();
    var error = "<xmlresponse><error>1</error></xmlresponse>";
    if (xhr.responseText == error){
        return null;
    }
    else{
    prob = earthquake(xhr.responseText);
    return prob;
    }
}

function earthquake(response){
    var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(response, "application/xml");
    var prob = null;
    prob = xmlDoc.getElementsByTagName("prob")[0].childNodes[0].nodeValue;
    if (prob == undefined){return null;}
    else{
    var percent = parseFloat(prob.toString());
    console.log(percent);
    return percent;
    }
}

function trequest(){
    var tornadoNum = 0;
    var latit = 32.303464; // Hardcoded location
	var longit = -100.770321;


	var request = new XMLHttpRequest();
	for (var x = 3; x < 8; x++){
    var dig = x.toString();
    request.open('GET', "https://www.spc.noaa.gov/wcm/data/" +"201" + dig +"_torn.csv", false);  // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) {
	  //console.log(request.responseText);
	  var dataset = request.responseText;
	  var dataArray = dataset.split("\n");
	  var dataArray2d = new Array();
	  for (var i = 0; i < dataArray.length; i++) {
		dataArray2d[i] = dataArray[i].split(",");
	  }
	  console.log(dataArray2d);
	}
	
	var latInd;
	var longInd;
	var magInd;
	for (var i = 0; i < dataArray2d[0].length; i++) {
		if (dataArray2d[0][i] == "slat") {
			latInd = i;
		}
		else if (dataArray2d[0][i] == "slon") {
			longInd = i;
		}
		else if (dataArray2d[0][i] == "mag") {
			magInd = i;
		}
	}
	var matchArray = new Array();
	
	for (var i = 0; i < dataArray2d.length; i++) {
		if (Math.round(latit * 10) / 10 == Math.round(dataArray2d[i][latInd] * 10) / 10) {
			matchArray.push(i);
		}
	}
	
	for (var i = 0; i < matchArray.length; i++) {
		if (Math.round(longit * 10) / 10 != Math.round(dataArray2d[i][longInd] * 10) / 10) {
			matchArray.splice(i, 1);
		}
	}
	
	var magSum = 0;
	for (var i = 0; i < matchArray.length; i++) {
		magSum += parseInt(dataArray2d[matchArray[i]][magInd]);
	}
     tornadoNum += matchArray.length;   
}
    console.log(tornadoNum);
    return tornadoNum;
}

function displayRisk(risk){
    document.getElementById('risk').innerHTML="<img id = 'dial' src = 'lowrisk.png'> This location has a " + risk + " risk of natural disasters.";
    document.getElementById('dial').src=risk + "risk.png";
}



function hrequest(){
	
	var latit = 32.303464; // Hardcoded location
	var longit = -100.770321;
	var request = new XMLHttpRequest();
	/*for (var x = 0; x < 16; x++){
    var dig = x.toString();
	if (dig.length == 1){
	dig = "0" + dig;	
	} */
    request.open('GET', "http://surge.srcc.lsu.edu/files/globalpeaksurgedb.csv", false);  // `false` makes the request synchronous
	request.send(null);
	if (request.status === 200) {
	  //console.log(request.responseText);
	  var dataset = request.responseText;
	  console.log(dataset);
	  var dataArray = dataset.split("\r");
	  console.log(dataArray);
	  var dataArray2d = new Array();
	  for (var i = 0; i < dataArray.length; i++) {
		dataArray2d[i] = dataArray[i].split(",");
	  }
	  console.log(dataArray2d);
	}
	
	var latInd;
	var longInd;
	var magInd;
	
	for (var i = 0; i < dataArray2d[0].length; i++) {
		if (dataArray2d[0][i] == "Lat") {
			latInd = i;
		}
		else if (dataArray2d[0][i] == "Lon") {
			longInd = i;
		}
		else if (dataArray2d[0][i] == "Surge_ft") {
			magInd = i;
		}
		
	}//
	var matchArray = new Array();
	for (var i = 0; i < dataArray2d.length; i++) {
		if (dataArray2d[i][0].slice(0,3)=="20") {
			matchArray.push(i);
		}
	}
	
	for (var i = 0; i < matchArray.length; i++) {
		if (Math.round(latit) != Math.round(dataArray2d[i][latInd])) {
			matchArray.splice(i,1);
		}
	}
	
	for (var i = 0; i < matchArray.length; i++) {
		if (Math.round(longit) != Math.round(dataArray2d[i][longInd])) {
			matchArray.splice(i, 1);
		}
	}
	
	var magSum = 0;
	for (var i = 0; i < matchArray.length; i++) {
		if (dataArray2d[matchArray[i]][magInd]!="") {
			magSum += parseInt(dataArray2d[matchArray[i]][magInd]);
		}
		else{
			magSum += parseInt(dataArray2d[matchArray[i]][magInd+2]);
		}
	}
	console.log(matchArray.length); // Number of hurricanes
	console.log(magSum / matchArray.length); // Average magnitude
    
    return matchArray.length;
}
    
   