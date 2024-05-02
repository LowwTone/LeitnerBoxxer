var days = 65;
var maxCompartments = 7;

//get reference to canvas context
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.font = "25px Arial";
ctx.strokeStyle = 'black';

//lines:
DrawLinesHorizontal(ctx, 8);
DrawLinesVertical(ctx);

//default draw: full LeitnerBox:
//DrawNumbersAlgo1(days);
DrawNumbersAlgo2(days);


//slider updates and slider value displays:
var daysSlider = document.getElementById("daysSlider");
var daysValueDisplay = document.getElementById("sliderDaysValueDisplay");
var compartmentsSlider = document.getElementById("compartmentsSlider");
var compartmentsValueDisplay = document.getElementById("sliderCompartmentsValueDisplay");


daysSlider.oninput = function() {
	days = this.value
	daysValueDisplay.innerHTML = days;

	//refresh canvas:	
	ctx.clearRect(0, 0, c.width, c.height);

	DrawLinesHorizontal(ctx, 8);
	DrawLinesVertical(ctx);
	
	//DrawNumbersAlgo1(days);
	DrawNumbersAlgo2(days);
} 


compartmentsSlider.oninput = function() {
	maxCompartments = this.value
	compartmentsValueDisplay.innerHTML = maxCompartments;

	//refresh canvas:	
	ctx.clearRect(0, 0, c.width, c.height);

	DrawLinesHorizontal(ctx, 8);
	DrawLinesVertical(ctx);
	
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
		
		if (days < 7) //exception for short schedules to exclude 4s
			elements[4].push(3);
		else 
			for (let i=4; i<days; i=i+8) {
				if (maxCompartments >= 4) //only add 4s if there are at least 4 compartments
					elements[i].push(4);
				else 
					elements[i].push(parseInt(maxCompartments));
			}		
	}	
	
	//add fives
	if (days > 8) {
		
		if (days < 13) //exception for short schedules to exclude 5s
			if (maxCompartments >= 4) //only add 4s if there are at least 4 compartments
				elements[8].push(4)
			else
				elements[8].push(parseInt(maxCompartments));
		else 
			for (let i=8; i<days; i=i+16) {
				if (maxCompartments >= 5) //only add 5s if there are at least 5 compartments
					elements[i].push(5);
				else
					elements[i].push(parseInt(maxCompartments));
			}		
	}	
	
	//add sixes
	if (days > 16) {
		
		if (days < 25) //exception for short schedules to exclude 6s
			if (maxCompartments >= 5) //only add 5s if there are at least 5 compartments
				elements[16].push(5)
			else
				elements[16].push(parseInt(maxCompartments));
		else 
			for (let i=16; i<days; i=i+32) {
				if (maxCompartments >= 6) //only add 6s if there are at least 6 compartments
					elements[i].push(6);
				else
					elements[i].push(parseInt(maxCompartments));
			}		
	}	

	//add sevens
	if (days > 32) {
		
		if (days < 49) //exception for short schedules to exclude 7s
			if (maxCompartments >= 6) //only add 6s if there are at least 6 compartments
				elements[32].push(6)
			else 
				elements[32].push(parseInt(maxCompartments));
		else 
			for (let i=32; i<days; i=i+64) {
				if (maxCompartments >= 7) //only add 7s if there are at least 7 compartments
					elements[i].push(7);
				else
					elements[i].push(parseInt(maxCompartments));
			}		
	}		

	PlotData(elements);
}

function DrawLinesHorizontal(context, amountOfLines, lineHeight=40, offset=10) {
	context.lineWidth = 2;
	ctx.strokeStyle = '#aaa'
    for (let i = 0; i < amountOfLines; i++) {
		ctx.beginPath();
        context.moveTo(5, offset + i * lineHeight);
        context.lineTo(1565, offset + i * lineHeight);
        context.stroke();
    }
	ctx.beginPath();
}

function DrawLinesVertical(context, offset=5) {
	context.lineWidth = 1;
	ctx.strokeStyle = '#aaa';
	for (let i = 0; i < 65 + 1; i++) {
		ctx.beginPath();
		context.moveTo(offset + i * 24, 10);
		context.lineTo(offset + i * 24, 400);
		context.stroke();
	}
	ctx.beginPath();
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
    
		ctx.beginPath();
        for(const number of data[i]) {
			ctx.font = "25px Arial";
			
            switch (number) {
                case 1:					
                    ctx.fillStyle = 'red';
					ctx.strokeText("1", x_position, 7 * line_height); 
                    ctx.fillText("1", x_position, 7 * line_height); 
                    break;
                case 2:
                    ctx.fillStyle = 'orange';
                    ctx.strokeText("2", x_position, 6 * line_height); 
                    ctx.fillText("2", x_position, 6 * line_height); 
                    break;
                case 3:
                    ctx.fillStyle = 'yellow';
                    ctx.strokeText("3", x_position, 5 * line_height); 
                    ctx.fillText("3", x_position, 5 * line_height); 
                    break;
                case 4:
                    ctx.fillStyle = 'green';
                    ctx.strokeText("4", x_position, 4 * line_height); 
                    ctx.fillText("4", x_position, 4 * line_height); 
                    break;
                case 5:
                    ctx.fillStyle = 'blue';
                    ctx.strokeText("5", x_position ,3 * line_height); 
                    ctx.fillText("5", x_position ,3 * line_height); 
                    break;
                case 6:
                    ctx.fillStyle = 'purple';
                    ctx.strokeText("6", x_position ,2 * line_height); 
                    ctx.fillText("6", x_position ,2 * line_height); 
                    break;
                case 7:
                    ctx.fillStyle = 'pink';
                    ctx.strokeText("7", x_position ,1 * line_height); 
                    ctx.fillText("7", x_position ,1 * line_height); 
                    break;
            }

			//draw the day number
			ctx.font = "15px Arial";
			ctx.fillStyle = 'black';
			if (i < 9) //adjust position for single digit numbers
				ctx.fillText((i+1).toString(), x_position + 3 ,8 * line_height); 
			else
				ctx.fillText((i+1).toString(), x_position - 1 ,8 * line_height); 

			ctx.beginPath();	
        }
    }
}
  
document.getElementById('download').addEventListener('click', function(e) {

	//convert canvas to image and download

	//regenerate image with white background
	//then export it. Then regenerate the canvas with the original background color
	
	//generate canvas with white background
	//adjust canvas size to relevant size for plotted data
	var original_canvas_width = c.width;
	c.width = 10 + days * 24;

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, c.width, c.height);
	DrawLinesHorizontal(ctx, 8);
	DrawLinesVertical(ctx);
	DrawNumbersAlgo2(days);	
	ctx.fillStyle = "white";
	ctx.fillRect(6 + days * 24, 0, 6 + days * 24, c.height); //overdraw white margin on the right side

	//convert canvas to image and simulate download click
	let canvasUrl = c.toDataURL("image/jpeg", 0.95);
	console.log(canvasUrl);
	const createEl = document.createElement('a');
	createEl.href = canvasUrl;
	createEl.download = "Leitnerboxxer-export.jpg";
	createEl.click();
	createEl.remove();

	//regenerate the original canvas
	c.width = original_canvas_width;
	ctx.clearRect(0, 0, c.width, c.height);
	DrawLinesHorizontal(ctx, 8);
	DrawLinesVertical(ctx);
	DrawNumbersAlgo2(days);
  });








