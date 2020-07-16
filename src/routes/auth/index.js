const passport = require('passport')
const router = require('express').Router()
const { handleLogout } = require('./handlers')

router.get('/google', passport.authenticate('google', {
    scope: [ 'openid' ],
}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/search',
    failureRedirect: '/search',
}))

router.get('/logout', handleLogout)

module.exports = router
