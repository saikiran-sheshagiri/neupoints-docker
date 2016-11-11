var logger = require("../logger").getLogger('default.api');

var DefaultApi = (function () {
    function DefaultApi(app) {
      app.get("/api/default", function (req, res) {
          logger.debug('default api.');
          res.status(200).send(`<html><body><div>The AccountingApi in running.</div></body></html>`);
      });
    }

    return DefaultApi;
}());
exports.DefaultApi = DefaultApi;
