const router = require('express').Router();
let Company = require('../models/company.model');

router.route('/').get((req, res) => {
    Company.find()
        .then(companies => res.json(companies))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const companyName = req.body.companyName;
    const description = req.body.description;
    const stockValues = req.body.stockValues.split(',');

    const newCompany = new Company({companyName, description, stockValues});

    newCompany.save()
        .then(() => res.json("Company Added!"))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route('/:id').get((req,res) => {
    Company.findById(req.params.id)
        .then(company => res.json(company))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route('/:id').delete((req,res) => {
    Company.findByIdAndDelete(req.params.id)
        .then(() => res.json("Company Deleted"))
        .catch(err => res.status(400).json("Error: " + err));
})

module.exports = router;