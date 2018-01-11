/**
 * Mock objects for testing purposes.
 */

exports.orders = [
    {requestDate: "2017-12-21T16:58:50.000Z", orderDate: "2018-01-11T16:58:56.000Z", itemName: "Ben-u-ron", form: "pills", quantity: 10, pharmacy: "pharmacy_good_health", latitude: 41.1461277, longitude: -8.5857730, timeRestriction: "0", },
    {requestDate: "2017-12-20T23:52:50.000Z", orderDate: "2018-01-11T16:52:56.000Z", itemName: "Aspirin", form: "pills", quantity: 20, pharmacy: "pharmacy_fresh_medicine", latitude: 41.1976618, longitude: -8.5560299, timeRestriction: "860", },
    {requestDate: "2017-12-21T16:58:50.000Z", orderDate: "2018-01-11T20:58:56.000Z", itemName: "Paracetamol Generis", form: "pills", quantity: 10, pharmacy: "pharmacy_green_rock", latitude: 41.1487987, longitude: -8.6121351, timeRestriction: "0"},
];

exports.providers = [
    {name: "mean_warehouse", latitude: 41.1742319, longitude: -8.6224058, timeRestriction: "160", orders: [1,2,3]},
];

exports.waypoints = [
    {latitude: 41.1461277, longitude: -8.5857730},
    {latitude: 41.1976618, longitude: -8.5560299},
    {latitude: 41.1487987, longitude: -8.6121351},
];

exports.pharmacies = [
    {name: "pharmacy_good_health", waypoint: 1},
    {name: "pharmacy_fresh_medicine", waypoint: 2},
    {name: "pharmacy_green_rock", waypoint: 3},
];

exports.deliveryPlans = [
    {VisitedPharmacies: [1,2], OrderedWaypoints: [1,2], NonVisitedPharmacies: [3]}
];

