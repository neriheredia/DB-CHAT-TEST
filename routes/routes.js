const router = require('express').Router()

//ROUTES
const userRoutes = require('./userRoute')
const conversationRoutes = require('./conversations')
const messagesRoutes = require('./message')

//Route Declarada
router.use('/auth', userRoutes)
router.use('/conversations', conversationRoutes)
router.use('/messages', messagesRoutes)

module.exports = router