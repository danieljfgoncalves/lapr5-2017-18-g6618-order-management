const request = require("request");
const Promise = require("bluebird");
const join = Promise.join;

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

    generateDeliveryPlan: (req, res) => {
        var body = {};

        if(req.query.recalculate != 'true') {
            body.url = "https://lapr5-g6618-orders-management.azurewebsites.net/api/deliveryPlans/new";
        }
        if (req.params.algorithm) body.algorithm = req.params.algorithm;
        join(
            Provider.find().limit(1),
            OrdersService.compile(),
            function(provider, orders) {
                body.departure = {
                    name: provider[0].name,
                    latitude: provider[0].latitude,
                    longitude: provider[0].longitude,
                    time: provider[0].timeRestriction
                };
                body.pharmacies = orders; 

                var options = {
                    url: 'http://ec2-54-213-7-246.us-west-2.compute.amazonaws.com:3000/calculatePlan',
                    headers: { 'content-type': 'application/json' },
                    json: true,
                    body: body
                };
                request.post(options, function (error, response, reqBody) {
                    if (error) {
                        return res.status(500).json(error);
                    }
                    return res.status(200).json(reqBody);
                }); 
        }).catch(function(err) {
            res.status(500).json(err);
        });
    }
};






