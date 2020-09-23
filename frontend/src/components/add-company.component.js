import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCompany() {
    var [company, setCompany] = useState({
        companyName: '',
        description: '',
        stockValues: ''
    })

    var [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        axios.get('https://stock-tracker-app-backend.herokuapp.com/companies/')
            .then(response => {
                setCompanyList(response.data)
            })
        }, []
    );

    function deleteCompany(id) {
        axios.delete('https://stock-tracker-app-backend.herokuapp.com/companies/' + id)
            .then(res => console.log(res.data));
        setCompanyList(companyList.filter(el => el._id !== id));
    }

    function updateCompanies(event) {
        var keyName = event.target.id;
        setCompany({
            ...company,
            [keyName]: event.target.value
        })
    }

    function generateStockValues() {
        var generatedValues = "";
        for (var i = 0; i < 12; i++) {
            generatedValues += String(Math.floor((Math.random() * 100) + 1)) + ',';
        }
        setCompany({
            ...company,
            stockValues: generatedValues
        })
    }

    function onSubmit(event) {
        event.preventDefault();

        const createdCompany = {
            companyName: company.companyName,
            description: company.description,
            stockValues: company.stockValues
        }

        axios.post('https://stock-tracker-app-backend.herokuapp.com/companies/add', createdCompany)
            .then(res => console.log(res.data));

        window.location = '/add-company';
    }

    function getCompanyList() {
        return companyList.map( currentCompany => {
            return <tr>
                        <td>{currentCompany.companyName}</td>
                        <td>{currentCompany.description}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => {deleteCompany(currentCompany._id)} }>
                                Delete
                            </button>
                        </td>
                    </tr>
        })
    }

    return (
        <div>
            <h3><u>Add New Company</u></h3>
            <br /><br />
            <div className= "row">
                <div className="col col-md-3"></div>
                <div className="col col-md-6">
                    <form onSubmit = { onSubmit }>
                        <div className="form-group">
                            <label>Company Name: </label>
                            <input type = "text" className = "form-control" required
                                id = "companyName" 
                                value = {company.companyName}
                                onChange = { updateCompanies } />
                        </div>

                        <div className="form-group">
                            <label>Description: </label>
                            <input type = "text" className = "form-control"
                                id = "description" 
                                value = {company.description}
                                onChange = { updateCompanies } />
                        </div>

                        <label>Stock Values: </label>
                        <div className="form-group form-inline">
                            <input  type = "text" 
                                    className = "form-control"
                                    id = "stockValues" 
                                    size = "37"
                                    value = {company.stockValues}
                                    onChange = { updateCompanies } />

                            &nbsp;&nbsp;&nbsp;
                            <input  type="button" 
                                    onClick = {generateStockValues} 
                                    className = "form-control btn btn-info"
                                    value="Generate Values" />
                        </div>

                        <div className="form-group ">
                            <input type="submit" value="Add Company" className="btn btn-primary btn-block" />
                        </div>

                    </form>
                </div>
            </div>

            <br /><br /><br />
            <div>
                <h3><u>Added Companies</u></h3>
                <br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Company Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCompanyList()}
                    </tbody>
                </table>
            </div>
        </div>


    )
};