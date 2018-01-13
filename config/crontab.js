const request = require('request-promise');
const Promise = require("bluebird");
const join = Promise.join;
const _ = require('underscore');


module.exports.crontab = {

    /* 
     
    * The asterisks in the key are equivalent to the 
     
    * schedule setting in crontab, i.e. 
     
    * second minute hour day month day-of-week year 
     
    * so in the example below it will run every minute 
     
    */


    crons: function () {
        var jsonArray = [];
        //jsonArray.push({interval:'1 * * * * * ',method:'mytest'}); 
        jsonArray.push({ interval: '30 0 * * *', method: 'generatePlan' });

        return jsonArray;

    },

    // declare the method mytest 
    // and add it in the crons function 
    // mytest: function(){ 
    // require('../crontab/mytest.js').run(); 
    // }
    generatePlan: function () {
        console.log('start');
        join(
            Provider.find().limit(1),
            OrdersService.compile(),
            function (provider, orders) {
                var body = {};
                body.url = "https://lapr5-g6618-orders-management.azurewebsites.net/api/deliveryPlans/new";
                body.departure = {
                    name: provider[0].name,
                    latitude: provider[0].latitude,
                    longitude: provider[0].longitude,
                    time: provider[0].timeRestriction
                };
                var pharmNames = _.pluck(orders, 'name');
                var uniqPharms = _.uniq(pharmNames);
                var pharms = _.map(uniqPharms, (pharm) => {
                    return _.find(orders, (order) => {
                        return order.name == pharm;
                    });
                });
                body.pharmacies = pharms;

                var options = {
                    url: 'http://ec2-54-213-7-246.us-west-2.compute.amazonaws.com:3000/calculatePlan',
                    headers: { 'content-type': 'application/json' },
                    json: true,
                    body: body
                };
                request.post(options, function (error, response, reqBody) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log(reqBody);
                    return;
                });
            })
        .catch(function (err) {
            console.log(err);
            return;
        });
    }

}; 