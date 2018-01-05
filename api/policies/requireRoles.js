/**
 * requireRoles.js
 * 
 * Middleware to check for roles.
 */

module.exports = function (requiredRoles) {
    return function (req, res, next) {

        var allowed = false;

        req.user["https://lapr5.isep.pt/roles"].forEach(adquiredRole => {
            if (requiredRoles.indexOf(adquiredRole) > -1) {
                allowed = true;
                return next();
            }
        });

        if (!allowed) {
            return res.status(403).send({'Message':'Unauthorized User'});
        }
    }
}