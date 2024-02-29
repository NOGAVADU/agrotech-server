const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const favoriteRouter = require('./favoriteRouter')
const itemRouter = require('./itemRouter')

router.use('/user', userRouter)
router.use('/favorite', favoriteRouter)
router.use('/item', itemRouter)

module.exports = router