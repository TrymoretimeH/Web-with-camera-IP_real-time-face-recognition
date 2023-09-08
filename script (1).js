const canvasStream = document.getElementById('canvasStream');
const video = document.getElementById('video');
var socket = new WebSocket('ws://localhost:9999');



window.addEventListener('load', () => {
  Promise.all([
    // faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    // faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    // faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  ]).then(startVideo);
  function startVideo() {
    video.srcObject = canvasStream.captureStream(30);

    // video.play().catch((err) => console.error(err));
  }
  const canvas = faceapi.createCanvas(video);
  const faceDetectionInterval = setInterval(async () => {
    if (socket.OPEN) {
      const videoWrapper = document.getElementById('videoWrapper');
      videoWrapper.append(canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
      // console.log("SOCKET OPEN!")
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks();
      // .withFaceExpressions();
      console.log(detections)
      detections.sort(function (a, b) {
        return b.detection.box.area - a.detection.box.area;
      });
      if (detections.length > 0) {
        largestFace = detections[0];
        // console.log('largeestFace: ', largestFace);
        const resizedDetections = faceapi.resizeResults(
          // draw biggest face detection
          // largestFace,
          // draw all faces detection
          detections,
          displaySize
        );
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        // clearInterval(faceDetectionInterval)
        // setTimeout(() => {
        //   faceDetectionInterval
        // }, 10000)
      } else {
        // const resizedDetections = faceapi.resizeResults(
        //   detections,
        //   displaySize
        // );
        // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        // faceapi.draw.drawDetections(canvas, resizedDetections);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }
    }
  }, 1000);

  // video.addEventListener('play', async () => {
  //   const canvas = await faceapi.createCanvas(video);
  //   const videoWrapper = document.getElementById('videoWrapper');
  //   videoWrapper.append(canvas);
  //   const displaySize = { width: video.width, height: video.height };
  //   faceapi.matchDimensions(canvas, displaySize);

  //   // face detection but increase delay (maybe because of event listener play by video player)
  //   setInterval(async () => {
  // const detections = await faceapi
  //   .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
  //   .withFaceLandmarks();
  // console.log("yes")
  // console.log(detections)
  // // .withFaceExpressions();
  // // detections.sort(function (a, b) {
  // //   return b.detection.box.area - a.detection.box.area;
  // // });
  // // if (detections.length > 0) {
  // //   largestFace = detections[0];
  // //   // console.log('largeestFace: ', largestFace);
  // //   const resizedDetections = faceapi.resizeResults(
  // //     largestFace,
  // //     displaySize
  // //   );
  // //   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  // //   faceapi.draw.drawDetections(canvas, resizedDetections);
  // //   // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  // //   // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  // // } else {
  // //   const resizedDetections = faceapi.resizeResults(
  // //     detections,
  // //     displaySize
  // //   );
  // //   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  // //   faceapi.draw.drawDetections(canvas, resizedDetections);
  // //   // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  // //   // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  // // }
  //     // video.srcObject = canvasStream.captureStream(30);
  //   }, 500);
  // });
});
