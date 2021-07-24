const {
    express,
    sendFailedResponse
} = require('./globals');
const AWS = require('aws-sdk');
require('dotenv')
var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const upload_router = express.Router();

upload_router.post('/thumbnail', (req, res) => {
    var is_show_video = req.body.is_show_video ? Number(req.body.is_show_video) : 0;
    var promises = [];
    var responses = [];
    Object.keys(req.files).forEach(key => {
        var file = req.files[`${key}`];
        // var fileName = Date.now() + file.name.replace(/[- )(]/g, '');
        var mimeTypeArray = file.name.split('.');
        var mimeType = mimeTypeArray[mimeTypeArray.length - 1];
        var fileName = Date.now() + '.' + mimeType;
        var keys = ['thumbnails/images/' + fileName]

        keys.forEach(key => {
            var params = {
                Bucket: process.env.AWS_BUCKET,
                Key: key,
                Body: file.data
            };
            promises.push(s3.upload(params).promise());
        });
        responses.push({
            fieldname: key,
            filename: fileName,
            path: process.env.THUMBNAIL_URL + keys[0]
        });
    });
    if (promises.length > 0) {
        Promise.all(promises).then(() => {
                res.status(200).json({
                    data: responses,
                    success: true
                });
            })
            .catch(function(error) {
                sendFailedResponse(req, res, error.message);
            });
    } else {
        sendFailedResponse(req, res, 'No file found!');
    }
});

module.exports = {
    upload_router
};