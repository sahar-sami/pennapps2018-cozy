var longit;
var latit;

<<<<<<< HEAD
window.onload = function (){
    /*Get the address from the website in the form of a string*/
	chrome.tabs.query({ active: true, currentWindow: true}, function() {
		//for (var i = 0; i < tabs.length; i++)
		if (typeof tabs === 'undefined') {
			// the variable is defined
			//chrome.tabs.query({ active: true, currentWindow: true}, checkActive());
			console.log("not loaded yet");
		}
		else {
			console.log("Length: " + tabs.length);
		}
	});
    var address = "100 Technology Dr, Edison, NJ 08837";
=======
window.onload = function(){
    
    var address = "7360 Chelwynde Ave, Philadelphia, PA 19153";
>>>>>>> 30a1d17c81240885510957c8553b751559a65ac8
    var highrisk = 0, midrisk = 0, lowrisk = 0;
    var risk;
	
	addressToCoor(addressFormat(address));
    	
    var tprob = trequest();
	
    hrequest();
	
	if (tprob >= 50){
        highrisk +=1;
        document.getElementById('tornado').innerHTML = "<span style = 'color: red'><b>High</b></span> risk of tornadoes.";
    }
    else if (tprob >= 20 && tprob <50){
        midrisk +=1;
        document.getElementById('tornado').innerHTML = "<span style = 'color: yellow'><b>Slight</b></span> risk of tornadoes.";
    }
    else {
        lowrisk += 1;
        document.getElementById('tornado').innerHTML = "<span style = 'color: green'><b>Low</b></span> risk of tornadoes.";
        document.getElementById('tornado').innerHTML = "<span style = 'color: green'><b>Low</b></span> risk of tornadoes.";
    }
    var eqprob = eqrequest(address);
    
    if (eqprob >= 25){
        highrisk += 1;
        document.getElementById('earthquake').innerHTML = "<span style = 'color: red'><b>High</b></span> risk of earthquakes.";
    }
    else if (eqprob >= 5 && eqprob < 25) {
        midrisk += 1;
        document.getElementById('earthquake').innerHTML = "<span style = 'color: yellow'><b>Slight</b></span> risk of earthquakes.";
    }
    else if (eqprob == null){
        document.getElementById('earthquake').innerHTML = "";
    } // say that data couldn't be found
    else {
        lowrisk += 1
        document.getElementById('earthquake').innerHTML = "<span style = 'color: green'><b>Low</b></span> risk of earthquakes.";
    }
    
    var hprob = hrequest();
    if (hprob >= 0){
        highrisk +=1; 
        document.getElementById('hurricane').innerHTML = "<span style = 'color: red'><b>High</b></span> risk of hurricanes.";
    }
    else if (hprob <0){
        midrisk +=1; 
        document.getElementById('hurricane').innerHTML = "<span style = 'color: yellow'><b>Slight</b></span> risk of hurricanes.";
    }
    else{
        lowrisk +=1; 
        document.getElementById('hurricane').innerHTML = "<span style = 'color: green'><b>Low</b></span> risk of hurricanes.";
    }
    
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



function addressFormat(address){
    var q = address;
    q = q.replace(/\s+/g, '+');
    return q;
}

function addressToCoor(formattedAdr) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBNTp0Xlgejxn7isVSaX6CgipMOSfgR5r4', true);
	xhr.responseType = 'json';
	xhr.onload = function() {
	  var status = xhr.status;
	  var loc = xhr.response;
	  console.log(loc);
	  console.log(loc.results[0].geometry.location.lat);
	  latit = loc.results[0].geometry.location.lat;
	  console.log(loc.results[0].geometry.location.lng);
	  longit = loc.results[0].geometry.location.lng;
	};
	xhr.send();
};

function eqrequest(address){
   //Manipulate address so that it can be used here
    var q = addressFormat(address);
    console.log(q);
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
    document.getElementById('risk').innerHTML="<img id = 'dial' src = 'lowrisk.png'> This location has a <b>" + risk + "</b> risk of natural disasters.";
    document.getElementById('dial').src=risk + "risk.png";
}

function hrequest(){
	
	console.log("Entered hrequest");
	
	var latit = 40.550473; // Hardcoded location
	var longit = -74.305870;
	var request = new XMLHttpRequest();
	
    request.open('GET', "http://surge.srcc.lsu.edu/files/globalpeaksurgedb.csv", false);  // `false` makes the request synchronous
	request.send(null);
	if (request.status === 200) {
	  //console.log(request.responseText);
	  var dataset = request.responseText;
	  var dataArray = dataset.split("\r");
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
		if (dataArray2d[i][0].slice(0,2)=="20") {
			matchArray.push(i);
		}
	}
	console.log("Time matches: " + matchArray.length);
	
	for (var i = 0; i < matchArray.length; i++) {
		if (Math.abs(latit - dataArray2d[i][latInd]) > 2) {
			matchArray.splice(i, 1);
		}
	}
	console.log("Lat matches: " + matchArray.length);
	
	for (var i = 0; i < matchArray.length; i++) {
		if (Math.abs(longit - dataArray2d[i][longInd]) > 2) {
			matchArray.splice(i, 1);
		}
	}
	console.log("Long matches: " + matchArray.length);

	
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
	console.log("Exiting hrequest");
    
    return matchArray.length;
}

function checkActive(tabs) {
	//for (var i = 0; i < tabs.length; i++)
	if (typeof tabs === 'undefined') {
		// the variable is defined
		//chrome.tabs.query({ active: true, currentWindow: true}, checkActive());
		console.log("not loaded yet");
	}
	else {
		console.log(tabs.length);
	}
}

/*
function scrapeThePage() {
    // Keep this function isolated - it can only call methods you set up in content scripts
    var htmlCode = document.documentElement.outerHTML;
    return htmlCode;
}

function timeCheck() {
	var checkExist = setInterval(function(){
	   if (document.querySelector('#check-1')) {
		  console.log("Exists!");
		  clearInterval(checkExist);
		  afterLoad();
	   }
	   else {console.log("CHECKING");}
	}, 100); // check every 100ms
}

function afterLoad() {
	document.addEventListener('DOMContentLoaded', () => {
		// Hook up #check-1 button in popup.html
		const fbshare = document.querySelector('#check-1');
		fbshare.addEventListener('click', async () => {
			// Get the active tab
			const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
			const tab = tabs[0];

			// We have to convert the function to a string
			const scriptToExec = `(${scrapeThePage})()`;

			// Run the script in the context of the tab
			const scraped = await chrome.tabs.executeScript(tab.id, { code: scriptToExec });

			// Result will be an array of values from the execution
			// For testing this will be the same as the console output if you ran scriptToExec in the console
			alert(scraped[0]);
		});
	});
}
*/
   