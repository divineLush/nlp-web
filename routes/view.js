const ex = require('express')

const viewController = require('../controllers/view')

const router = ex.Router()

router.get('/', viewController.getIndex)

module.exports = router
