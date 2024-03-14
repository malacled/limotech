// import specific service class
const fleet_service = require('../../../services/fleet')

// mention the service's needed actions (methods)
const fleet_controller = {


    getAll(req, res) {
        res.json(fleet_service.getAll())
    },
    create(req, res) {
        res.status(201).json(
            fleet_service.create(req, res)
        )
    },
    update(req, res) {
        const fleet = fleet_service.update(req.params.id, req.body)

        if (fleet) {
            res.json(fleet)
        } 
        else {
            res.status(404).send('Fleet item is not found.')
        }
    },
    delete(req, res) {
        const fleet = fleet_service.getById(req.params.id)

        if (fleet) {
            fleet_service.delete(req.params.id)
            res.status(204).send('Fleet item deleted.')
        } 
        else {
            res.status(404).send('Fleet item not found.')
        }
    }
}

module.exports = fleet_controller
