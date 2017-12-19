/**
 * Mock objects for testing purposes.
 */

exports.orders = [
    {requestDate: "Tue Dec 19 2017 11:59:42 GMT+0000 (Hora padrão de GMT)", itemName: "Ben-u-ron", form: "pills", quantity: 10, pharmacy: "TestPharmacy", latitude: 1.20, longitude: 2.42, timeRestriction: "morning", },
    {requestDate: "Tue Dec 19 2017 12:39:44 GMT+0000 (Hora padrão de GMT)", itemName: "Aspirin", form: "pills", quantity: 20, pharmacy: "TestPharmacy", latitude: 1.40, longitude: 1.42, timeRestriction: "afternoon", },
    {requestDate: "Tue Dec 19 2017 14:25:37 GMT+0000 (Hora padrão de GMT)", itemName: "Paracetamol Generis", form: "pills", quantity: 10, pharmacy: "TestPharmacy", latitude: 1.80, longitude: 2.60, timeRestriction: "morning"},
];

exports.providers = [
    {name: "provider1", latitude: 1.20, longitude: 1.30, orders: [3]},
    {name: "provider2", latitude: 1.40, longitude: 1.50, orders: []},
    {name: "provider3", latitude: 1.60, longitude: 1.80, orders: []}
];

exports.deliveryPlans = [
    {path: "[{'pharmacy': 'TestPharmacy1', 'latitude':1.20, 'longitude':2.42},{'pharmacy': 'TestPharmacy2', 'latitude':1.40, 'longitude':2.62}]",
    orders: [1,2]}
];

