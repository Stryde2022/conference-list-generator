const dropArea = document.querySelector(".drop-area");
const inputFile = document.getElementById("file");
const imageView = document.querySelector(".img-view");
const fullName = document.getElementById("full-name");
const emailAddress = document.getElementById("email-address");
const userName = document.getElementById("username");
const form = document.querySelector(".form");


function uploadImage() {
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.textContent = "";
    imageView.style.backgroundColor = "";
}

inputFile.addEventListener("change", function(event) {

    const dragText = document.querySelector(".drag-text");
    const removeContainer = document.querySelector(".remove-text-container");

    const uploadContainer = document.querySelector(".upload");
    const imageError = document.querySelector(".image-error");

    let limitFile = event.target.files[0];

    if (limitFile && limitFile.size > 500 * 1024) {
        uploadContainer.classList.add("hide");
        imageError.classList.remove("hide");
        event.target.value = "";
        return;
    }

    if (!["image/jpeg", "image/png"].includes(limitFile.type)) {
        event.target.value = "";
        return;
    }

    uploadImage();

    dragText.classList.add("hide");
    removeContainer.classList.remove("hide");
});


const removeBtn = document.querySelector(".remove-text");

removeBtn.addEventListener("click", function() {

    const dragText = document.querySelector(".drag-text");
    const removeContainer = document.querySelector(".remove-text-container");

    removeContainer.classList.add("hide");
    dragText.classList.remove("hide");
    imageView.style.backgroundImage = "";
    imageView.innerHTML = `<img src="assets/images/icon-upload.svg" alt="">`;
    imageView.style.backgroundColor =  "#8784a446";

    inputFile.value = "";
});


// Part for the Form submission
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!emailPattern.test(emailAddress.value) || emailAddress.value === "") {
        document.querySelector(".email-error").classList.remove("hide");
        return;
    } 

    form.classList.add("hide");

    document.querySelector(".ticket").classList.remove("hide");

    document.querySelector("h1").innerHTML = `Congrats, <span style="background: linear-gradient(to right, #f37362, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${fullName.value}</span>! Your ticket is ready.`;

    document.getElementById("secure").innerHTML = `We've emailed your ticket to <span style = "background-color: #f37362; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${emailAddress.value}</span> and will send updates in the run up to the event.`;

    let limitFile = inputFile.files[0];

    // check if limitFile contails filelist object
    if (limitFile) {
        let imgLink = URL.createObjectURL(limitFile);

        document.querySelector(".ticket-profile-pic").style.backgroundImage = `url(${imgLink})`;

        document.querySelector(".ticket-profile-pic").textContent = ""; // to remove initial image in DOM
    }

    document.querySelectorAll(".logo-head")[1].textContent = fullName.value;
    document.querySelectorAll(".logo-date")[1].textContent = userName.value;
});


// remove email error states on filling inputfile
emailAddress.addEventListener("input", function() {
    document.querySelector(".email-error").classList.add("hide")
});

// Prevent default action on dropping file into browser 
// and prevent it from opening automatically
dropArea.addEventListener("dragover", function(e) {
    e.preventDefault();
});

// transfer dropped image to filelist
dropArea.addEventListener("drop", function(e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
    console.log(inputFile.files);
});