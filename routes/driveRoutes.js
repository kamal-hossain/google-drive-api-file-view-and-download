const express = require('express');
const router = express.Router();
const driveController = require('./../controllers/driveController');


router.get('/getfoldercontent/:folderid', driveController.getFolderContents);
// router.get('/downloadafile/:fileid/:filename', driveController.downloadAFile);
router.get('/getfileparents/:fileid/', driveController.getFileParents);
router.get('/openafile/:fileid/', driveController.openAFile);

module.exports = router;
