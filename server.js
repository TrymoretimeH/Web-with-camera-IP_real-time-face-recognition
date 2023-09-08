const Stream = require('node-rtsp-stream');
// const Stream = require('node-rtsp-stream-es6');
stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://admin:KEUKPL@192.168.1.240:554/',
  wsPort: 9999,
  ffmpegOptions: { // options ffmpeg flags
    '-pix_fmt': 'yuv420p',
    '-an': '',                       // Disable audio
    '-codec:v': 'mpeg1video',          
    '-preset': 'ultrafast',          // Adjust the preset as needed
    '-tune': 'zerolatency',          // Use zerolatency tune for low delay
    '-f': 'mpegts',
    '-r': 20
}
})

// const options = {
//   name: 'streamName',
//   url: 'rtsp://admin:KEUKPL@192.168.1.240:554/',
//   port: 9999,
// };
// stream = new Stream(options);
// stream.start();
