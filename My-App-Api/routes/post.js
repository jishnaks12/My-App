const {
    db,
    express,
    sendFailedResponse
} = require("./globals");
var router = express.Router();
router.get('/list', function(req, res) {
    var {
        user_id
    } = req.query

    var condition = 'WHERE up.public_post =1 AND up.delete_status=1';
    if (user_id) {
        condition = ' WHERE up.user_id = $1 AND up.delete_status=1';
    }
    console.log("condition",condition,"user_id",user_id)
    db.any(`SELECT post_id,title,description,image,public_post,TO_CHAR(date,'YYYY-MM-DD') as day,ru.name FROM user_post as up  JOIN registered_users ru on up.user_id = ru.user_id  ${condition}`, [user_id])
        .then(function(data) {
            res.status(200)
                .json({
                    data: data,
                    success: true,
                    message: 'Post Lists'
                });
        })
        .catch(function(error) {
            sendFailedResponse(req, res, error.message);
        });
});

router.post('/add', function(req, res) {
    var {
        title,
        description,
        image,
        public_post,
        user_id
    } = req.body;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    date = `${yyyy}-${mm}-${dd}`;

    db.any('INSERT INTO user_post(title,description,image,public_post,delete_status,date,user_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING post_id', [title, description, image, public_post, 1, date, user_id])
        .then(function() {
            res.status(200)
                .json({
                    success: true,
                    message: 'Post Added successfully '
                });
        })
        .catch(function(error) {
            sendFailedResponse(req, res, error.message);
        });
});
router.post('/update', function(req, res) {
    var {
        post_id,
        title,
        description,
        image,
        public_post
    } = req.body;


    db.any('UPDATE user_post SET title =$1,description=$2,image=$3,public_post=$4 WHERE post_id = $5', [title, description, image, public_post, post_id])
        .then(function() {
            res.status(200)
                .json({
                    success: true,
                    message: 'Post Updated successfully '
                });
        })
        .catch(function(error) {
            sendFailedResponse(req, res, error.message);
        });
});
router.get('/:id', function(req, res) {
    var {
        id
    } = req.params;


    db.any('SELECT title,description,image,public_post FROM user_post WHERE  post_id = $1', [id])
        .then(function(data) {
            res.status(200)
                .json({
                    data: data,
                    success: true,

                });
        })
        .catch(function(error) {
            sendFailedResponse(req, res, error.message);
        });
});
router.get('/delete/:id', function(req, res) {
    var {
        id
    } = req.params;


    db.any('UPDATE user_post SET delete_status=0 WHERE  post_id = $1', [id])
        .then(function(data) {
            res.status(200)
                .json({
                   
                    success: true,

                });
        })
        .catch(function(error) {
            sendFailedResponse(req, res, error.message);
        });
});
module.exports = router;