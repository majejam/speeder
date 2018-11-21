var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
let msec = 00
let sec = 00
let min = 00
function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	msec = diff.getMilliseconds()
	sec = diff.getSeconds()
	min = diff.getMinutes()
	var hr = diff.getHours()-1
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0"+msec
	}

	timerID = setTimeout("chrono()", 16)
}
function chronoStart(){
	start = new Date()
	chrono()
}
function chronoContinue(){
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
function chronoReset(){
	start = new Date()
}

function chronoStop(){
	clearTimeout(timerID)
}
function chronoResetVar(){
  msec = 0
  sec = 0
  min = 0
}
