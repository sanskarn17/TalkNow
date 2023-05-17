const router = require('express').Router();
const authcontroller  =require('./controllers/auth-controller')
const activateController = require('./controllers/activate-controller');
const authMiddleware = require('./middleware/auth-middleware');
const authController = require('./controllers/auth-controller');
const roomsController = require('./controllers/rooms-controller')
router.post('/api/send-otp',authcontroller.sendOtp);
router.post('/api/verify-otp',authcontroller.verifyOtp);
router.post('/api/activate',authMiddleware, activateController.activate);
router.get('/api/refresh',authController.refresh);
router.post('/api/logout',authMiddleware, authController.logout);
router.post('/api/rooms',authMiddleware, roomsController.create);
router.get('/api/rooms',authMiddleware,roomsController.index);
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show)

module.exports = router;
