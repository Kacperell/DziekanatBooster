const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');
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
router.post('/student', PagesController.addToOrders)

router.get('/administrator', catchErrors(PagesController.administrator));



module.exports = router;