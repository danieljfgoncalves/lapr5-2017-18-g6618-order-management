const request = require("request-promise");

/**
 * DeliveryPlanController
 *
 * @description :: Server-side logic for managing Deliveryplans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    generateDeliveryPlan: function (req, res) {

        // sets yesterday's date and time at 23:50 (last delivery plan generation time)
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(23, 50, 0, 0);

        // sets today's date and time at 23:50 (delivery plan generation time)
        var today = new Date();
        today.setDate(today.getDate() + 1);
        today.setHours(23, 50, 0, 0);

        Order.find({ orderDate: { '>': yesterday, '<': today } }).populate('provider').exec(function (err, orders) {

            Provider.find().exec(function (err, providers) {
                providers.forEach(function (provider) {
                    console.log(provider.name);
                    // array of daily orders of each provider
                    var dailyOrders = []

                    // data for Travels Management request
                    // {
                    //     "departure": {
                    //         "name":"Warehouse XPTO",
                    //         "latitude":"40.1234567",
                    //         "longitude":"30.1234567",
                    //         "time":"160"
                    //     }
                    //     "pharmacies": [
                    //         {
                    //             "name":"PharmacyA",
                    //             "latitude":"35.1234567",
                    //             "longitude":"40.1234567",
                    //             "limitTime":"860"
                    //         },
                    //         {
                    //             "name":"PharmacyB",
                    //             "latitude":"30.1234567",
                    //             "longitude":"35.1234567",
                    //             "limitTime":"860"
                    //         }
                    //     ]
                    // }
                    var travelsData = {
                        url:url,
                        departure: {},
                        pharmacies: []
                    }
                    orders.forEach(function (order) {
                        if (order.provider.id == provider.id) {
                            dailyOrders.push(order)
                            travelsData.url = 'http://lapr5-orders-management.azurewebsites.net/api/deliveryPlan'
                            travelsData.departure.name = order.provider.name
                            travelsData.departure.latitude = order.provider.latitude
                            travelsData.departure.longitude = order.provider.longitude
                            travelsData.departure.time = order.provider.timeRestriction

                            travelsData.pharmacies.push({ "name": order.pharmacy, "latitude": order.latitude, "longitude": order.longitude, "limitTime": order.timeRestriction })
                        }
                    })
                    if (dailyOrders.length > 0) {

                        // TEST
                        travels = JSON.stringify(travelsData)
                        console.log(travels)

                        var options = {
                            url: 'http://ec2-54-213-7-246.us-west-2.compute.amazonaws.com:3000/calculatePlan',
                            body: { body: JSON.stringify(travelsData) },
                        };

                        request.post(options, function (error, response, body) {
                            if (error) {
                                console.log(error);
                                return res.send(error);
                            }
                            return res.send(body);
                        })

                    }
                })
                if (err) {
                    return res.serverError(err);
                }
            })
            if (err) {
                return res.serverError(err);
            }
            //return res.ok("No orders found!");
        })
    }

}


