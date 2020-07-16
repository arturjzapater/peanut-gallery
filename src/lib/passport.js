const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { google } = require('../conf/auth')

const gooStrategy = new GoogleStrategy(
    google,
    (accessToken, refreshToken, profile, done) => done(null, profile)
)

passport.serializeUser((profile, done) => done(null, {
    id: `${profile.provider}:${profile.id}`,
}))

passport.deserializeUser((user, done) => done(null, user))

passport.use(gooStrategy)

module.exports = passport
