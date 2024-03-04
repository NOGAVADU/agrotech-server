const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')

router.post('/', itemController.create)
router.get('/', itemController.getAll)
router.get('/find', itemController.findAll)
router.get('/:id', itemController.getOne)

module.exports = router