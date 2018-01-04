/**
 * StatusController
 *
 * @description :: Server-side logic for managing Statuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    getStatus: function (req, res) {

        Order.count().exec(function countCB(err, orders) {
            if (err) {
                return res.serverError(err);
            }
            return res.status(200).json({"count": orders});
        })
    }

};

