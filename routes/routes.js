const router = require('express').Router();

router.get('/', function (req,res){
    res.render('../views/monitor.ejs');
});

module.exports = router;
