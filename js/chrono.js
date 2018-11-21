var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
let msec = 0
let sec = 0
let min = 0
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
		msec = "0"
	}

	timerID = setTimeout("chrono()", 10)
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
  console.log('stop')
}
