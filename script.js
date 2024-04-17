

var days = 16;

//get reference to canvas context
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "25px Arial";
ctx.strokeStyle = 'black';

//lines:
DrawLines(ctx, 8);
DrawLines(ctx, 8);

//default draw: full LeitnerBox:
//DrawNumbersAlgo1(days);
DrawNumbersAlgo2(days);


//slider updates and slider value display:
var slider = document.getElementById("rangeSlider");
var valueDisplay = document.getElementById("sliderValueDisplay");

slider.oninput = function() {
	days = this.value
	valueDisplay.innerHTML = days;

	//refresh canvas:
	ctx.clearRect(0, 0, c.width, c.height);
	DrawLines(ctx, 8);
	//DrawNumbersAlgo1(days);
	DrawNumbersAlgo2(days);
} 



function DrawLines(context, amountOfLines, lineHeight=50) {
    for (let i = 0; i < amountOfLines; i++) {
        context.moveTo(0, 50 + i * lineHeight);
        context.lineTo(1600, 50 + i * lineHeight);
        context.stroke();
    }
}

function DrawNumbersAlgo1(days) {
	
	//testdata, replace with generated algorithmic data later:
	var data = [[1,2],[1,3],[1,2],[1,4],[1,2],[1,3],[1,2],[1],[1,2],[1,3],[1,2],[1,5],[1,2,4],[1,3],[1,2],[1]];

	//first stab at "algorithm". Remove elements in this order to compact leitnerbox to smaller day amounts
	var exclusionList = [7,8,11,12,3,4,1,14,9,6,13,2]
	
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
	
	PlotData(remainingElements);
}


function DrawNumbersAlgo2(days) {
	
	//initialize array with sublists of ones:
	//elements = Array.apply(null, Array(days)).map(Number.prototype.valueOf,0);
	elements = [];
	
	//add ones
	for (let i=0; i<days; i++) {
		elements.push([1]);
	}
	
	//add twos
	for (let i=1; i<days; i=i+2) {
		elements[i].push(2);
	}	
	
	//add threes
	if (days >= 2) {
		for (let i=2; i<days; i=i+4) {
			elements[i].push(3);
		}		
	}
	
	//add fours
	if (days >= 4) {
		
		//if (days < 7) 
		//	elements[3].push(3);
		//else 
			for (let i=4; i<days; i=i+8) {
				elements[i].push(4);
			}		
	}	
	
	//add fives
	if (days >= 8) {
		
		//if (days < 13)
		//	elements[7].push(4)
		//else 
			for (let i=8; i<days; i=i+16) {
				elements[i].push(5);
			}		
	}	
	
	PlotData(elements);
	
	
	console.log(elements);
	
}


function PlotData(data) {
	//plot the values to the canvas
    for (let i=0; i<data.length; i++) {


        let x_position = 10 + i * 24; //offset position by index
		
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'black';
    
        for(const number of data[i]) {
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
  









