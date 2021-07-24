const {
    express,
    sendFailedResponse
} = require('./globals');
var router = express.Router();


const login = require('./login');
const post = require('./post');

const {
    upload_router
} = require('./upload');


router.use((req, res, next) => {
    next();
});


router.use('/upload', upload_router);
router.use('/account', login);
router.use('/post', post);


module.exports = router;