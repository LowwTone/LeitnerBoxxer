//testdata, replace with generated algorithmic data later:
var boxNumbers = [[1,2],[1,3],[1,2],[1,4],[1,2],[1,3],[1,2],[1],[1,2],[1,3],[1,2],[1,5],[1,2,4],[1,3],[1,2],[1]];

//first stab at "algorithm". Remove elements in this order to compact leitnerbox to smaller day amounts
var exclusionList = [7,8,11,12,3,4,1,14,9,6,13,2]

var days = 16;

//get reference to canvas context
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.strokeStyle = 'black';

//lines:
DrawLines(ctx, 8);

//default draw: full LeitnerBox:
DrawNumbers(boxNumbers, days);


//slider updates and slider value display:
var slider = document.getElementById("rangeSlider");
var valueDisplay = document.getElementById("sliderValueDisplay");

slider.oninput = function() {
	days = this.value
	valueDisplay.innerHTML = days;

	//refresh canvas:
	ctx.clearRect(0, 0, c.width, c.height);
	DrawLines(ctx, 8);
	DrawNumbers(boxNumbers, days);
} 



function DrawLines(context, amountOfLines, lineHeight=50) {
    for (let i = 0; i < amountOfLines; i++) {
        context.moveTo(0, 50 + i * lineHeight);
        context.lineTo(790, 50 + i * lineHeight);
        context.stroke();
    }
}

function DrawNumbers(data, days) {
	
	//calculate numer of days to exclude from full schedule
	var numExclusions = data.length - days;
	var exclusions = exclusionList.slice(0,numExclusions); 

	
	//generate array without the excluded elements
	var remainingElements = [];
	for (let i=0; i<data.length; i++) {
		if (exclusions.includes(i))
			continue;
		remainingElements.push(data[i]);
	}
	
	//plot the values to the canvas
    for (let i=0; i<remainingElements.length; i++) {


        let x_position = 10 + i * 30; //offset position by index
		
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'black';
    
        for(const number of remainingElements[i]) {
            switch (number) {
                case 1:					
                    ctx.fillStyle = 'red';
					ctx.strokeText("1", x_position, 390); //fix coordinates
                    ctx.fillText("1", x_position, 390); //fix coordinates
                    break;
                case 2:
                    ctx.fillStyle = 'orange';
                    ctx.strokeText("2", x_position, 340); //fix coordinates
                    ctx.fillText("2", x_position, 340); //fix coordinates
                    break;
                case 3:
                    ctx.fillStyle = 'yellow';
                    ctx.strokeText("3", x_position, 290); //fix coordinates
                    ctx.fillText("3", x_position, 290); //fix coordinates
                    break;
                case 4:
                    ctx.fillStyle = 'green';
                    ctx.strokeText("4", x_position, 240); //fix coordinates
                    ctx.fillText("4", x_position, 240); //fix coordinates
                    break;
                case 5:
                    ctx.fillStyle = 'blue';
                    ctx.strokeText("5", x_position ,190); //fix coordinates
                    ctx.fillText("5", x_position ,190); //fix coordinates
                    break;
                //FIXME: add more cases
            }
        }
    }
}
  









