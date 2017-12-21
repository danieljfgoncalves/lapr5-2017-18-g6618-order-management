module.exports.crontab = {

    /* 
     
    * The asterisks in the key are equivalent to the 
     
    * schedule setting in crontab, i.e. 
     
    * minute hour day month day-of-week year 
     
    * so in the example below it will run every minute 
     
    */


    crons: function () {
        var jsonArray = [];
        //jsonArray.push({interval:'1 * * * * * ',method:'mytest'}); 
        //jsonArray.push({interval:'*/1 * * * * * ',method:'anothertest'}); 
        jsonArray.push({ interval: '50 23 * * * *', method: 'generateDeliveryPlan' });

        return jsonArray;

    },

    // declare the method mytest 
    // and add it in the crons function 
    // mytest: function(){ 
    // require('../crontab/mytest.js').run(); 
    // } 

    generateDeliveryPlan: function () {
        require('../api/controllers/deliveryPlanController.js').generateDeliveryPlan();
    }

    /* 
    anothertest:function(){ 
    require('../crontab/anothertest.js').run(); 
    } 
    */


}; 