const { body, param } = require('express-validator');
const fleet_service = require('../../services/fleet')

const addFleetValidation = () => {
    return [
        body('eventName')
            .notEmpty().withMessage('Event name must not be empty')
            .isLength({ min: 8, max: 255 }).withMessage('Event name must be between 8 and 255 characters long'),
        body('productionDate')
            .notEmpty().withMessage('Event date time must not be empty')
            .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
            .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
        body('carType')
            .notEmpty().withMessage('Car Type cannot be empty.'),
        body('contactPhone')
            .notEmpty().withMessage('Contact phone must not be empty')
            .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx'),
        body('carMiles')
            .notEmpty().withMessage('Car Miles cannot be empty'),
    ];
};

const deleteFleetValidation = () => {
    return [
        param('id').custom(async (id) => {
            const exists = await fleet_service.getById(id);
            if (!exists) {
                throw new Error('Fleet item not found');
            }
        })
    ];
};

const updateFleetValidation = () => {
    return [
        param('id').custom(async (id) => {
            const exists = await fleet_service.getById(id);
            if (!exists) {
                throw new Error('Fleet item not found.');
            }
        }),
        body('eventName')
            .notEmpty().withMessage('Event name must not be empty')
            .isLength({ min: 8, max: 255 }).withMessage('Event name must be between 8 and 255 characters long'),
        body('productionDate')
            .notEmpty().withMessage('Event date time must not be empty')
            .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
            .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
        body('carType')
            .notEmpty().withMessage('Car Type cannot be empty.'),
        body('contactPhone')
            .notEmpty().withMessage('Contact phone must not be empty')
            .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx'),
        body('carMiles')
            .notEmpty().withMessage('Car Miles cannot be empty'),
    ];
};

module.exports = {
    addFleetValidation,
    updateFleetValidation,
    deleteFleetValidation
};