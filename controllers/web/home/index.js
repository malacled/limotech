const fleet_service = require('../../../services/fleet')

const home_controller = {
    index: async (req, res) =>{
        res.render('home');
    },
    add: async (req, res) =>{
        res.render('home/add_update', { mode: 'Add' });
    },
    update: async (req, res) =>{
        const fleetData = await fleet_service.getById(req.params.id);
        res.render('home/add_update', { mode: 'Update', fleetData: fleetData });
    }
};

module.exports = home_controller;