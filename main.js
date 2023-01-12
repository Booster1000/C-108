function startClassification() {
    //navigator.mediadevices.getUsermedia is to help to check the devices and get permision //can recognize audio or not and get the permission from the user to access the device
    navigator.mediaDevices.getUserMedia({
        audio: true
    });
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/weS9fBg3f/model.json", model_ready);
}

function model_ready() {
    classifier.classify(got_result);
}

detected_dogs = 0;
detected_cats = 0;

function got_result(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        random_number_r = Math.floor(Math.random() * 255);
        random_number_g = Math.floor(Math.random() * 255);
        random_number_b = Math.floor(Math.random() * 255);

        document.getElementById('sound').innerHTML = 'I can hear - ' + results[0].label;
        document.getElementById('accuracy').innerHTML = 'I can hear - ' + (results[0].confidence * 100).toFixed(2) + '%';

        document.getElementById('sound').style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_b + ")";
        document.getElementById('accuracy').style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_b + ")";

        img1 = document.getElementById('img1')

        if (results[0].label == "Barking") {
            img1.src = "dog.png";
            detected_dogs = detected_dogs + 1;
            document.getElementById('dogs').innerHTML = "Detected Dogs - " + detected_dogs;
        }
         else if (results[0].label == "Meowing") {
            img1.src = "cat.png";
            detected_cats = detected_cats + 1;
            document.getElementById('cats').innerHTML = "Detected Cats - " + detected_cats;
         } 
         else {
            img1.src = "ear.png";
        }
    }
}