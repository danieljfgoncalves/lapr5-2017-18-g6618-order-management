/**
 * Mock objects for testing purposes.
 */

exports.orders = [
    {itemName: "Ben-u-ron", quantity: 10, pharmacy: "TestPharmacy", latitude: 1.20, longitude: 2.42, timeRestriction: "morning", },
    {itemName: "Aspirin", quantity: 20, pharmacy: "TestPharmacy", latitude: 1.40, longitude: 1.42, timeRestriction: "afternoon", },
    {itemName: "Paracetamol Generis", quantity: 10, pharmacy: "TestPharmacy", latitude: 1.80, longitude: 2.60, timeRestriction: "morning"},
];

exports.providers = [
    {name: "provider1", orders: [3]},
    {name: "provider2", orders: []},
    {name: "provider3", orders: []}
];

exports.deliveryPlans = [
    {path: "[{'pharmacy': 'TestPharmacy1', 'latitude':1.20, 'longitude':2.42},{'pharmacy': 'TestPharmacy2', 'latitude':1.40, 'longitude':2.62}]",
    orders: [1,2]}
];

