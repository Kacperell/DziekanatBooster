const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const VisitController = require('../controllers/VisitController');
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

router.get('/administrator', catchErrors(PagesController.administrator));

router.post('/addVisist/:date/:time/:category', catchErrors(VisitController.addVisit));
router.get('/readVisit/:id', catchErrors(VisitController.readVisit));
router.post('/deleteVisit/:id', catchErrors(VisitController.deleteVisit));
router.get('/checkUserVisits', catchErrors(VisitController.checkUserVisits));
router.get('/checkFreeVisitsHours/:date', catchErrors(VisitController.checkFreeVisitsHours));


module.exports = router;