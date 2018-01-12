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
    }

};

module.exports = DeliveryPlanService;