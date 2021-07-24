const {
    db,
    express,
    sendFailedResponse
} = require("./globals");
var router = express.Router();
router.post('/register', function(req, res) {
    var {
        email,
        password,
        name
    } = req.body
    if (email == '' || password == '') {
        sendFailedResponse(req, res, 'Please enter mandatory fields');
    } else {
        db.any(`SELECT user_id from registered_users where email=$1`, [email])
            .then(data => {
                if (data.length > 0) {
                    sendFailedResponse(req, res, 'email already exists');

                } else {
                    db.any('INSERT INTO registered_users(email,password,name,delete_status) VALUES($1,md5($2),$3,$4) RETURNING user_id', [email, password, name, 1])
                        .then(function(user_data) {

                            res.status(200)
                                .json({
                                    success: true,
                                    data: user_data,
                                    message: 'Registration success!'
                                });

                        })
                        .catch(error => {
                            sendFailedResponse(req, res, error.message);
                        });
                }
            })
            .catch(error => {
                sendFailedResponse(req, res, error.message);
            });
    }
});
router.get('/login', function(req, res) {
    var {
        email,
        password,
    } = req.query
    db.any(`SELECT user_id from registered_users where email=$1 and password=md5($2)`, [email, password])
        .then(data => {
            if (data.length == 0) {
                sendFailedResponse(req, res, 'no user exists');

            } else {
                   res.status(200)
                    .json({
                        success: true,
                        data: data,
                        message: 'Logedin!'
                    });
            }
        })
        .catch(error => {
            sendFailedResponse(req, res, error.message);
        });


});
module.exports = router;