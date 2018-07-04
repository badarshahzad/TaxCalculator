const noteRoutes = require('./note_routes');

module.exports = function(app, db){
    noteRoutes(app, db);
    //other route groups could go there, in the
}