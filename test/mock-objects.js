/**
 * Mock objects for testing purposes.
 */

exports.orders = [
    {
        requestDate: "2017-12-21T16:58:50.000Z",
        orderDate: "2018-01-12T16:58:56.000Z",
        itemName: "Ben-u-ron", form: "pills",
        quantity: 10,
        pharmacy: "pharmacy_good_health",
        latitude: "41.2040539",
        longitude: "-8.6482001",
        timeRestriction: "500"
    },
    {
        requestDate: "2017-12-20T23:52:50.000Z",
        orderDate: "2018-01-12T16:52:56.000Z",
        itemName: "Aspirin",
        form: "pills",
        quantity: 20,
        pharmacy: "pharmacy_fresh_medicine",
        latitude: "41.2208412",
        longitude: "-8.6270177",
        timeRestriction: "860"
    },
    {
        requestDate: "2017-12-21T16:58:50.000Z",
        orderDate: "2018-01-12T20:58:56.000Z",
        itemName: "Paracetamol Generis",
        form: "pills",
        quantity: 10,
        pharmacy: "pharmacy_green_rock",
        latitude: "41.1984097",
        longitude: "-8.6814919",
        timeRestriction: "1200"
    },
        {
        requestDate: "2017-12-21T16:58:50.000Z",
        orderDate: "2018-01-13T20:58:56.000Z",
        itemName: "Paracetamol Generis",
        form: "pills",
        quantity: 10,
        pharmacy: "pharmacy_blue_rock",
        latitude: "41.1984097",
        longitude: "-8.6814919",
        timeRestriction: "1200"
    }
];

exports.providers = [
    {
        name: "Warehouse",
        latitude: "41.2343045",
        longitude: "-8.6200599",
        timeRestriction: "480",
        orders: [1, 2, 3]
    },
];

exports.waypoints = [
    {
        latitude: "41.2040539",
        longitude: "-8.6482001"
    },
    {
        latitude: "41.2208412",
        longitude: "-8.6270177"
    },
    {
        latitude: "41.1984097",
        longitude: "-8.6814919"
    },
];

exports.pharmacies = [
    {
        name: "pharmacy_good_health",
        waypoint: 1
    },
    {
        name: "pharmacy_fresh_medicine",
        waypoint: 2
    },
    {
        name: "pharmacy_green_rock",
        waypoint: 3
    },
];

exports.deliveryPlans = [
    {
        TotalDistance: "1000000",
        VisitedPharmacies: [1,2],
        NonVisitedPharmacies: [],
    }
];

