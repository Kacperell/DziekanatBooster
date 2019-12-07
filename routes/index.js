const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const visitContoller = require('../controllers/visitContoller');
const {
    catchErrors
} = require('../handlers/errorHandlers');


router.get('/', PagesController.home);

router.get('/register', PagesController.formRegister);
router.post('/register', PagesController.register);

router.get('/login', PagesController.formLogin);
router.post('/login', catchErrors(PagesController.login));

router.get('/signOut', catchErrors(PagesController.signOut));

router.get('/student', catchErrors(PagesController.student));
router.post('/student', PagesController.addToOrders);

router.get('/administrator', catchErrors(PagesController.administrator));

//api 😊
router.post('/addVisist/:date/:time/:category', catchErrors(visitContoller.addVisit));
router.get('/readVisit/:id', catchErrors(visitContoller.readVisit));
router.post('/deleteVisit/:id', catchErrors(visitContoller.deleteVisit));
router.get('/checkUserVisits', catchErrors(visitContoller.checkUserVisits));
router.get('/checkFreeVisitsHours/:date', catchErrors(visitContoller.checkFreeVisitsHours));


module.exports = router;