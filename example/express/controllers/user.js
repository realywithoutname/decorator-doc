const user = module.exports = {}

user.login = function (req, res) {
  res.send(Object.assign({ id: 1 }, req.body))
}