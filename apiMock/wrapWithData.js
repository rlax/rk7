module.exports = (req, res, next) => {
  // res.data = res;
  res.jsonp({
    data: res.locals.data
  });
  next();
}