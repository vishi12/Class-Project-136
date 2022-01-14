objects = [];
status = "";

function preload(){
    video = createVideo("video.mp4")
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 500, 400);

    if (status != ""){
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status - Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects are: " + objects.length;
        }
    }
}