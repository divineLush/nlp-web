const ex = require('express')

const viewController = require('../controllers/view')

const router = ex.Router()

router.get('/', viewController.getIndex)

router.get('/viewer', viewController.getViewer)

router.get('/analytics', viewController.getViewer)

router.post('/viewer/search', viewController.postSearch)

module.exports = router
