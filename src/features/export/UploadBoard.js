import {useEffect, useState} from "react";

function UploadBoard(){
    let cv = window.cv;
    const processImage = () => {

        // Perform image processing using OpenCV.js
        // Example: Convert an image to grayscale
        const imgElement = document.getElementById('inputImage');
        debugger;
        const srcMat = cv.imread(imgElement);
        const grayMat = new cv.Mat();
        cv.cvtColor(srcMat, grayMat, cv.COLOR_RGBA2GRAY);
        cv.imshow('outputCanvas', grayMat);

        srcMat.delete();
        grayMat.delete();
    };
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = document.getElementById('inputImage');
            imgElement.src = event.target.result;
        };
        debugger;
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <input type="file" onChange={handleFileInputChange}/>
            <img id="inputImage" alt="Uplaoded" style={{ display: 'flex', maxWidth: '100%' }}/>
            <button onClick={processImage}>Change</button>
            <canvas id="outputCanvas" style={{ display: 'flex', maxWidth: '100%' }}></canvas>
        </div>
    )
}

export default UploadBoard;