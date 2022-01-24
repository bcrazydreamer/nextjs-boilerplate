const { render } = require('../utils').response;

exports.renderIndexPage = (req, res) => {
  return render(req, res, 'index', {});
};
