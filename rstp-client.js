const RtspStream = require('node-rtsp-stream');

const cameraConfig = {
    name: 'camera-stream',
    streamUrl: 'rtsp://admin:KEUKPL@192.168.1.214:554/h264_stream', // Thay đổi địa chỉ IP và cổng RTSP
    wsPort: 9999 // Cổng WebSocket để truyền luồng video đến trình duyệt
};

const stream = new RtspStream(cameraConfig);

stream.on('data', data => {
    // Dữ liệu video từ camera
    console.log('Received video data:', data);
});
