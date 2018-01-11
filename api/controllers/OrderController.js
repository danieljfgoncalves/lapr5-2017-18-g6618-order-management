/**
 * OrderController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
     * POST /api/orders/new
     */
    createNewOrder: (req, res) => {

        // get all providers
        Provider.find(function (err, providers) {
            if (err) {
                res.serverError(err);
                return;
            }

            var provider = selectProvider(providers);

            Order.create({
                requestDate: req.body.requestDate,
                itemName: req.body.itemName,
                form: req.body.form,
                quantity: req.body.quantity,
                pharmacy: req.body.pharmacy,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                timeRestriction: req.body.timeRestriction,
                provider: provider

            }).exec(function (err) {
                if (err) {
                    return res.badRequest(err);
                }
                return res.status(201).json({ message: 'Order successfully created!'})
            })
        })
    },

}

/**
 * Selects a random provider from the providers list.
 * @param {*} providers The list of providers
 * @returns the selected provider
 */
selectProvider = function (providers) {

    var provider = providers[Math.floor(Math.random() * providers.length)];

    return provider;
}
