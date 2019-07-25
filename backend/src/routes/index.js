const noteRoutes = require("./note_routes");
const gymLogRoutes = require("./gymLogRoutes");

module.exports = function(app, db) {
    gymLogRoutes(app, db);
};
