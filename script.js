// const video = document.getElementById('canvas')

// Promise.all([
//   faceapi.nets.ageGenderNet.loadFromUri('/models'),
//   faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ]).then(startVideo)
// console.log(faceapi)
// function startVideo() {
//   navigator.getUserMedia(
//     { video: {} },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
// }

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceExpressions()
// detections.sort(function (a, b) {
//   return b.detection.box.area - a.detection.box.area;
// });
// if (detections.length > 0) {
//   largestFace = detections[0];
//   console.log('largeestFace: ', largestFace);
//   const resizedDetections = faceapi.resizeResults(largestFace, displaySize);
//   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//   faceapi.draw.drawDetections(canvas, resizedDetections);
//   faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//   faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
// } else {
//   const resizedDetections = faceapi.resizeResults(detections, displaySize);
//   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//   faceapi.draw.drawDetections(canvas, resizedDetections);
//   faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//   faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
// }

//   }, 100)
// })

// const video = document.getElementById('video')

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/models'),
//   faceapi.nets.ageGenderNet.loadFromUri('/models')
//  ]).then(startVideo)

// startVideo()

// function startVideo() {
//   /*
//   navigator.getUserMedia(
//     { video: {} },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
//   */

//   navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: false
//   })
//   .then(
//     (cameraStream) => {
//       video.srcObject = cameraStream;
//     }
//   )

// }

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()
//     const resizedDetections = faceapi.resizeResults(detections, displaySize)
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//     faceapi.draw.drawDetections(canvas, resizedDetections)
//     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//     faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//     resizedDetections.forEach( detection => {
//       const box = detection.detection.box
//       const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
//       drawBox.draw(canvas)
//     })

//   }, 100)
// })

// const video = document.getElementById('video');
window.addEventListener('load', () => {
  const canvasStream = document.getElementById('canvasStream');
  const video = document.getElementById('video');

  Promise.all([
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  ]).then(startVideo);
  // .then(console.log("START!"))

  function startVideo() {
    if (canvasStream.captureStream()) {
     
        //Display the video stream in the video object
        video.srcObject = canvasStream.captureStream();
        //Play the video stream
        video.play().catch((err) => console.error(err));

    }
  }

  video.addEventListener('play', async () => {
    // const canvas = await faceapi.createCanvasFromMedia(video);
    const canvas = await faceapi.createCanvas(video.srcObject);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions();
      // Sử dụng mã xử lý phát hiện khuôn mặt ở đây
      // ...
      detections.sort(function (a, b) {
        return b.detection.box.area - a.detection.box.area;
      });
      if (detections.length > 0) {
        largestFace = detections[0];
        console.log('largeestFace: ', largestFace);
        const resizedDetections = faceapi.resizeResults(
          largestFace,
          displaySize
        );
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      } else {
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }
    }, 100);
  });
  
})
