const request = require("request-promise");

/**
 * DeliveryPlanController
 *
 * @description :: Server-side logic for managing Deliveryplans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * POST /api/deliveryPlans/new
     */
    createNewDeliveryPlan: (req, res) => {

        // updates date of non delivered orders to be compiled in the next day

        // sets yesterday's date and time at 23:50 (last delivery plan generation time)
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(23, 50, 0, 0);

        // sets today's date and time at 23:50 (delivery plan generation time)
        var today = new Date();
        today.setDate(today.getDate() + 1);
        today.setHours(23, 50, 0, 0);

        Order.find({ orderDate: { '>': yesterday, '<': today } }).exec(function (err, orders) {
            if (err) {
                return res.serverError(err);
            }
            orders.forEach(function (order) {
                req.body.NonVisitedPharmacies.forEach(function (nonVisitedPharmacy) {
                    if (order.pharmacy == nonVisitedPharmacy.name) {
                        var date = new Date();
                        date.setTime(order.orderDate.getTime())
                        date.setDate(order.orderDate.getDate() + 1)
                        order.orderDate = date;
                        order.save(function (err) {
                            if (err) {
                                return res.send("Couldn't save order!");
                            }
                        });
                    }
                })
            })

            DeliveryPlan.create({
                VisitedPharmacies: req.body.VisitedPharmacies,
                OrderedWaypoints: req.body.OrderedWaypoints,
                NonVisitedPharmacies: req.body.NonVisitedPharmacies
            }).exec(function (err) {
                if (err) {
                    return res.badRequest(err);
                }
                return res.status(201).json({ message: 'Delivery plan successfully created!' })
            })
        })
    },

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
            if (err) {
                return res.serverError(err);
            }

            var travelsReqData = {
                url: 'https://lapr5-g6618-orders-management.azurewebsites.net/api/deliveryPlans',
                departure: {},
                pharmacies: []
            }

            if (orders.length > 0) {
                // departure info - same for every order
                travelsReqData.departure.name = orders[0].provider.name
                travelsReqData.departure.latitude = orders[0].provider.latitude
                travelsReqData.departure.longitude = orders[0].provider.longitude
                travelsReqData.departure.time = orders[0].provider.timeRestriction

                orders.forEach(function (order) {
                    //pharmacies info
                    travelsReqData.pharmacies.push({ "name": order.pharmacy, "latitude": order.latitude, "longitude": order.longitude, "limitTime": order.timeRestriction })
                })

                //     // // TEST
                //     // travels = JSON.stringify(travelsReqData)
                //     // console.log(travels)

                var options = {
                    url: 'http://ec2-54-213-7-246.us-west-2.compute.amazonaws.com:3000/calculatePlan',
                    body: JSON.stringify(travelsReqData),
                };
                console.log(options.body)

                request.post(options, function (error, response, body) {
                    console.log("SENDING...")
                    if (error) {
                        return res.send(error);
                    }
                    return res.send(body)
                })

            } else {
                return res.json({ message: 'No Orders found in the considered period!' })
            }
        })

    },

    // generateDeliveryPlan: function (req, res) {

    //     travelReqData = '{"url":"https://lapr5-g6618-orders-management.azurewebsites.net/api/deliveryPlans","departure": {"name":"mean_warehouse","latitude":"41.1742319","longitude":"-8.6224058","time":"160"},"pharmacies": [{"name":"pharmacy_good_health","latitude":"41.1461277","longitude":"-8.5857730","limitTime":"0"},{"name":"pharmacy_fresh_medicine","latitude":"41.1976618","longitude":"-8.5560299","limitTime":"860"},{"name":"pharmacy_green_rock","latitude":"41.1487987","longitude":"-8.6121351","limitTime":"0"},{"name":"pharmacy_painless","latitude":"41.1149393","longitude":"-8.6257084","limitTime":"0"},{"name":"pharmacy_pray_and_spray","latitude":"41.1873061","longitude":"-8.6756314","limitTime":"0"}]}'
    //     var options = {
    //         url: 'http://ec2-54-213-7-246.us-west-2.compute.amazonaws.com:3000/calculatePlan',
    //         // TEST
    //         body: travelReqData,
    //         json: true
    //     };
    //     console.log(options.body)

    //     request.post(options, function (error, response, body) {
    //         console.log("SENDING...")
    //         if (error) {
    //             return res.send(error);
    //         }
    //         return res.send(body)
    //     })
    // }

}






