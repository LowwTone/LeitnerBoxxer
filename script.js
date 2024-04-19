

var days = 65;

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
	if (days > 4) {
		
		if (days < 7) 
			elements[4].push(3);
		else 
			for (let i=4; i<days; i=i+8) {
				elements[i].push(4);
			}		
	}	
	
	//add fives
	if (days > 8) {
		
		if (days < 13)
			elements[8].push(4)
		else 
			for (let i=8; i<days; i=i+16) {
				elements[i].push(5);
			}		
	}	
	
	//add sixes
	if (days > 16) {
		
		if (days < 25)
			elements[16].push(5)
		else 
			for (let i=16; i<days; i=i+32) {
				elements[i].push(6);
			}		
	}	

	//add sevens
	if (days > 32) {
		
		if (days < 49)
			elements[32].push(6)
		else 
			for (let i=32; i<days; i=i+64) {
				elements[i].push(7);
			}		
	}		

	PlotData(elements);
	
	
	console.log(elements);
	
}

function DrawLines(context, amountOfLines, lineHeight=40, offset=10) {
	context.lineWidth = 2;
    for (let i = 0; i < amountOfLines; i++) {
        context.moveTo(0, offset + i * lineHeight);
        context.lineTo(1600, offset + i * lineHeight);
        context.stroke();
    }
}

function PlotData(data) {
	//plot the values to the canvas
    for (let i=0; i<data.length; i++) {

		const canvas_height = 420; //fix this: retrieve from actual canvas
		const y_offset = 10;
		const line_height = 40;
        let x_position = 10 + i * 24; //offset position by index
		
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'black';
    
        for(const number of data[i]) {
            switch (number) {
                case 1:					
                    ctx.fillStyle = 'red';
					ctx.strokeText("1", x_position, 7 * line_height); //fix coordinates
                    ctx.fillText("1", x_position, 7 * line_height); //fix coordinates
                    break;
                case 2:
                    ctx.fillStyle = 'orange';
                    ctx.strokeText("2", x_position, 6 * line_height); //fix coordinates
                    ctx.fillText("2", x_position, 6 * line_height); //fix coordinates
                    break;
                case 3:
                    ctx.fillStyle = 'yellow';
                    ctx.strokeText("3", x_position, 5 * line_height); //fix coordinates
                    ctx.fillText("3", x_position, 5 * line_height); //fix coordinates
                    break;
                case 4:
                    ctx.fillStyle = 'green';
                    ctx.strokeText("4", x_position, 4 * line_height); //fix coordinates
                    ctx.fillText("4", x_position, 4 * line_height); //fix coordinates
                    break;
                case 5:
                    ctx.fillStyle = 'blue';
                    ctx.strokeText("5", x_position ,3 * line_height); //fix coordinates
                    ctx.fillText("5", x_position ,3 * line_height); //fix coordinates
                    break;
                case 6:
                    ctx.fillStyle = 'purple';
                    ctx.strokeText("6", x_position ,2 * line_height); //fix coordinates
                    ctx.fillText("6", x_position ,2 * line_height); //fix coordinates
                    break;
                case 7:
                    ctx.fillStyle = 'pink';
                    ctx.strokeText("7", x_position ,1 * line_height); //fix coordinates
                    ctx.fillText("7", x_position ,1 * line_height); //fix coordinates
                    break;
            }
        }
    }
}
  









