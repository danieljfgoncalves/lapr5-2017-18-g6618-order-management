const _ = require('underscore');

var OrdersService = {
    compile: function() {
    
        return new Promise(function(resolve, reject) {

            // sets yesterday's date and time at 23:50 (last delivery plan generation time)
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(23, 50, 0, 0);
            // sets today's date and time at 23:50 (delivery plan generation time)
            var today = new Date();
            today.setHours(23, 50, 0, 0);

            Order.find({ orderDate: { '>': yesterday, '<': today } }).exec(function(err, orders) {
                if (err) {
                    reject(err);
                }
                else if (orders.length > 0) {
                    
                    var compiledOrders = _.map(orders, function(order) {
                        return {
                            "name": order.pharmacy,
                            "latitude": order.latitude,
                            "longitude": order.longitude,
                            "time": order.timeRestriction
                        };
                    });
                    resolve(compiledOrders);
                } else {
                    reject({ message: 'No Orders found in the considered period!' });
                }
            });
        });
    }
};

module.exports = OrdersService;