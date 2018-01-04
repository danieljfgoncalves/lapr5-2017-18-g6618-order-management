/**
 * Mock objects for testing purposes.
 */

exports.orders = [
    {requestDate: "2017-12-21T16:58:50.000Z", orderDate: "2017-12-21T16:58:56.000Z", itemName: "Ben-u-ron", form: "pills", quantity: 10, pharmacy: "TestPharmacy", latitude: 1.20, longitude: 2.42, timeRestriction: "morning", },
    {requestDate: "2017-12-20T23:52:50.000Z", orderDate: "2017-12-20T23:52:56.000Z", itemName: "Aspirin", form: "pills", quantity: 20, pharmacy: "TestPharmacy", latitude: 1.40, longitude: 1.42, timeRestriction: "afternoon", },
    {requestDate: "2017-12-21T16:58:50.000Z", orderDate: "2017-12-21T16:58:56.000Z", itemName: "Paracetamol Generis", form: "pills", quantity: 10, pharmacy: "TestPharmacy", latitude: 1.80, longitude: 2.60, timeRestriction: "morning"},
];

exports.providers = [
    {name: "provider1", latitude: 1.20, longitude: 1.30, timeRestriction: "160", orders: [1]},
    {name: "provider2", latitude: 1.40, longitude: 1.50, timeRestriction: "170", orders: [2,3]},
    {name: "provider3", latitude: 1.60, longitude: 1.80, timeRestriction: "180", orders: []}
];

exports.waypoints = [
    {latitude: 1.20000, longitude: 1.30000},
    {latitude: 1.55000, longitude: 1.66000},
    {latitude: 40.55000, longitude: -8.66000},
];

exports.pharmacies = [
    {name: "PharmacyA", waypoint: 1},
    {name: "PharmacyB", waypoint: 2},
    {name: "PharmacyC", waypoint: 3},
];

exports.deliveryPlans = [
    {VisitedPharmacies: [1,2], OrderedWaypoints: [1,2], NonVisitedPharmacies: [3]}
];

