// const express = require('express');
const express: any = {};
// const bodyParser = require('body-parser');
const bodyParser: any = {}
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Simulated authorized API keys (replace with your actual logic)
const authorizedKeys = ['your-api-key'];

// Middleware to check API key
function checkApiKey(req, res, next) {
    const process: any = {}
    const cameraIp = process?.env.PRIVATE_CAMERA_IP
    const cameraAddress = process?.env.PRIVATE_CAMERA_ADDRESS
    const cameraAccount = process?.env.PRIVATE_CAMERA_ACCOUNT
    const cameraPassword = process?.env.PRIVATE_CAMERA_PASSWORD

    const accessToken = req.headers.Authorization
    const axios: any = {}
    // const config = {
    //     headers : {
    //         Authorization: `Bearer ${accessToken}`
    //     },
    //     body: {}
    // }
    // axios?.post('/api/checkApi', config)
    //     .then(res => {
    //         if (res?.result === true) {
    //             next()
    //         }
    //         else {
    //             res?.status(403)?.json({ message: "Unauthorized" })
    //         }
    //     })
    //     res?.status(403)?.json({ message: "Unauthorized" })
}

// Route to fetch camera data (requires valid API key)
app.get('/camera', (req, res) => {
    // Simulated camera data
    const cameraData = { status: 'OK', message: 'Camera data retrieved' };
    res.json(cameraData);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
