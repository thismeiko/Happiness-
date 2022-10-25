let faceapi;
let detections=[];

let Canvas;
let video;

function setup() {
 Canvas = createCanvas(480, 360);
  Canvas.id('canvas');

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.id('video');

  // by default all options are set to true
const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minCofidence:0.5
  };

  // video.hide(); // Hide the video element, and just show the canvas
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
  textAlign(RIGHT);
}

function faceReady() {
  console.log("ready!");
  console.log(faceapi);
  faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  // console.log(result)
  detections = result;

  clear();
drawBoxes(detections);
drawLandmarks(detections);
drawExpressions(detections,20,250,14);

console.log(detections);
faceapi.detect(gotFaces);
}

function draw(){

}
  
function drawBoxes(detections){
  if (detections) {
    if (detections.length > 0) {
      // console.log(detections)
      for(var f=0;f<detections.length; f++){
        // let x = detections[0].alignedRect._box._x;
        // let y = detections[0].alignedRect._box._y;
        // let rectWidth = detections[0].alignedRect._box._width;
        // let rectHeight = detections[0].alignedRect._box._height;
        let {_x,_y,_width,_height} = detections[0].alignedRect._box;

        stroke(44,169,225);
        strokeWeight(1);
        noFill();
        rect(_x,_y,_width,_height);

      }
    }
  }
}

  function drawLandmarks(detections){
    if(detections){
        if(detections.length>0){
            for(f=0; f<detections.length; f++){
                let points =detections[f].landmarks.positions;
                for(let i=0; i<points.length; i++){
                    stroke(44,169,255);
                    strokeWeight(3);
                    point(points[i]._x,points[i]._y);
                }
            }
        }
        }
    }

    function drawExpressions(detections, x, y, textYspace){
        textFont('Helvetica Neue');
        textSize(14);
        noStroke();
        fill(44,169,225);

        if(detections.length>0){
            let {neutral, happy, angry, sad, disgusted, surprised, fearful} 
            = detections[0].expressions;

            text("neutral:" + nf(neutral *100,2,2) + "%",x,y);
            text("happy:" + nf(neutral *100,2,2) + "%",x,y + textYspace);
            text("sad:" + nf(neutral *100,2,2) + "%",x,y + textYspace*2);
        }
        else{
            text("neutral:" , x,y);
            text("happy:" ,x,y + textYspace);
            text("sad:" ,x,y + textYspace*2);
        }
    }
  



