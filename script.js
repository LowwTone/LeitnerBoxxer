function DrawLines(context, amountOfLines, lineHeight=50) {
    for (let i = 0; i < amountOfLines; i++) {
        context.moveTo(0, 10 + i * lineHeight);
        context.lineTo(490, 10 + i * lineHeight);
        context.stroke();
    }
  }
  
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  
  //lines:
  DrawLines(ctx, 5);
  
  ctx.font = "30px Arial";
  ctx.fillStyle = 'blue';
  //ctx.fillText("Hello qsWorld",10,50);
  for (let i = 0; i < 10; i++) {
    ctx.fillText("Hello qsWorld",10,50);
    text += cars[i] + "<br>";
  } 