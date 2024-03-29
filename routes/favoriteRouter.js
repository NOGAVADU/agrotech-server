const Router = require('express')
const router = new Router()
const favoriteController = require('../controllers/favoriteController')

router.post('/', favoriteController.add)
router.delete('/', favoriteController.remove)
router.get('/', favoriteController.getAll)
router.get('/items', favoriteController.getItemsFavItems)


module.exports = router