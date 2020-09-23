const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: { type: String, required: true },
    description: { type: String, required: true},
    stockValues: { type: Array, required: true},
}, {
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;