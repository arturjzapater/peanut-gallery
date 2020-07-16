const handleLogout = (req, res) => {
    req.logout()
    req.session = null
    res.redirect('/search')
}

module.exports = {
    handleLogout,
}
