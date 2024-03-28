const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), itemController.create)
router.delete('/', checkRoleMiddleware("ADMIN"), itemController.deleteOne)
router.get('/', itemController.getAll)
router.get('/find', itemController.findAll)
router.get('/:id', itemController.getOne)

module.exports = router