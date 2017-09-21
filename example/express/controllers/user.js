const user = module.exports = {}


user.login = function (req, res) {
  req.db('user').where(req.body).then(result => {
    res.send(result)
  })
}