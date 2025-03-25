module.exports = (req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace('/api', '');
    next();
  } else {
    res.status(404).send('Not found');
  }
};
