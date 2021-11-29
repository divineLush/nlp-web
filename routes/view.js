const { Router } = require('express')
const multer = require('multer')

const viewController = require('../controllers/view')

const router = Router()
const upload = multer({ dest: 'uploads/' })

router.get('/', viewController.getIndex)
router.get('/viewer', viewController.getViewer)
router.get('/analytics', viewController.getViewer)
router.get('/viewer/:id', viewController.getDetailedViewer)

router.post('/viewer/search', viewController.postSearch)
router.post('/viewer', upload.single('upload'), viewController.postUpload)

module.exports = router
