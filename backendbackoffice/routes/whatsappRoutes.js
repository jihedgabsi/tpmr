const express = require('express');
const router = express.Router();
const whatsappController = require('../Controllers/whatsappController');

router.post('/start', whatsappController.startWhatsApp);
router.get('/qrcode', whatsappController.getQRCode);
router.post('/send', whatsappController.sendMessage);
router.post('/sendchafftn', whatsappController.sendMessageaTousLesChauffeurtn);
router.get('/status', whatsappController.getStatus);
router.post('/logout', whatsappController.logoutWhatsApp);

module.exports = router;
