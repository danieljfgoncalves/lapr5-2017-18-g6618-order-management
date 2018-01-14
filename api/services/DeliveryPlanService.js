/**
 * DeliveryPlanService.js
 * 
 * Service for delivery plan related operations.
 */
const Promise = require("bluebird");

var DeliveryPlanService = {

    /**
     * Maps given plans to full format.
     */
    mapPlans: function(plans) {
        return new Promise((resolve, reject) => {

            let plansDTO = [];
            async.map(plans, (plan, callback) => {
                this.mapPlan(plan).then(planDTO => {
                    plansDTO.push(planDTO);
                    callback();
                });
            }, (err) => {
                if (err) {
                    return resolve(err2);
                }
                return resolve(plansDTO);
            });

        });
    },

    /**
     * Maps a given plan to full format.
     */
    mapPlan: function(plan) {
        return new Promise((resolve, reject) => {

            let planDTO = {
                id: plan.id,
                createdAt: plan.createdAt,
                updatedAt: plan.updatedAt,
                TotalDistance: plan.TotalDistance,
                date: plan.date
            };

            Promise.join(
                this.mapPharmacies(plan.VisitedPharmacies),
                this.mapPharmacies(plan.NonVisitedPharmacies),
                (visitedPhars, nonVisitedPhars) => {
                    planDTO.VisitedPharmacies = visitedPhars;
                    planDTO.NonVisitedPharmacies = nonVisitedPhars;
                    return resolve(planDTO);
                }
            );

        });
    },

    /**
     * Maps given pharmacies to full format.
     */
    mapPharmacies: function(pharmacies) {
        return new Promise((resolve, reject) => {

            let pharmaciesDTO = [];
            async.map(pharmacies, (pharmacy, callback) => {
                this.mapPharmacy(pharmacy).then(pharmacyDTO => {
                    pharmaciesDTO.push(pharmacyDTO)
                    return callback();
                })
            }, (err) => {
                if (err) {
                    return resolve(err);
                }
                return resolve(pharmaciesDTO)
            });

        });
    },

    /**
     * Maps given pharmacy to full format.
     */
    mapPharmacy: function(pharmacy) {
        return new Promise((resolve, reject) => {

            Pharmacy.findById(pharmacy.id)
            .populate('waypoint')
            .populate('orderedWaypoints')
            .exec((err, pharmacyDTO) => {
                return resolve(pharmacyDTO[0]);
            });

        });
    },

    /**
     * Appends related waypoints to each visited node
     */
    appendWaypoints: function(nodes, waypoints) {
        var result = [];
        for (var i = 0; i < nodes.length - 1; i++) {

            var current = nodes[i];
            var next = nodes[i + 1];

            var index1 = 1 + _.findIndex(waypoints, (waypoint) => {
                return ((waypoint.latitude == current.latitude) || (waypoint.latitude == current.longitude));
            });
            var index2 = _.findIndex(waypoints, (waypoint) => {
                return ((waypoint.latitude == next.latitude) || (waypoint.longitude == next.longitude));
            });
            if (index1 > index2) {
                var aux = index1;
                index1 = index2;
                index2 = aux;
            }
            var waypts = [];
            for (var j = index1; j < index2; j++) {
                waypts.push(waypoints[j]);
            }

            let waypointsDTO = [];
            let limit = 20;
            if (waypts.length < limit) {
                waypointsDTO = waypts;
            } else {
                let offset = ~~(waypts.length / limit);
                for (let i = 0; i < limit; i++) {
                    waypointsDTO.push(waypts[i * offset]);
                }
            }

            var pharmacy = {
                name: current.name,
                waypoint: 
                    {
                        latitude: current.latitude,
                        longitude: current.longitude,
                    },
                time: current.time,
                orderedWaypoints: waypointsDTO
            };
            result.push(pharmacy);
        }

        var lastAux = _.last(nodes);
        var last = {
            name: lastAux.name,
            waypoint: 
                {
                    latitude: lastAux.latitude,
                    longitude: lastAux.longitude,
                },
            time: lastAux.time
        };
        result.push(last);

        return result;
    },

    reorderNonDelivered: function(orders, nonVisited) {

        var nonVisitedNames = _.pluck(nonVisited, 'name');
        var reorders = _.filter(orders, (order) => {
            return _.contains(nonVisitedNames, order.pharmacy);
        });
        async.each(reorders, function (reorder, callback) {

            var date = new Date();
            date.setTime(reorder.orderDate.getTime());
            date.setDate(reorder.orderDate.getDate());
            reorder.orderDate = date;
            reorder.save(function (err) {
                if (err) {
                    return err;
                }
                callback();
            });
        });
    },


};

module.exports = DeliveryPlanService;