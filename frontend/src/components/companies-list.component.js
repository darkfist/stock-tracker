import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Visualization from './visualization.component'

export default function CompaniesList() {

    var [companyList, setCompanyList] = useState([]);

    var [displayList, setDisplayList] = useState({
        selectBox1: { companyName: "Not Selected", stockValues: [] },
        selectBox2: { companyName: "Not Selected", stockValues: [] },
        selectBox3: { companyName: "Not Selected", stockValues: [] },
        selectBox4: { companyName: "Not Selected", stockValues: [] }
    });


    useEffect(() => {
        const fetchCompanies = () => {
            axios.get('https://stock-tracker-app-backend.herokuapp.com/companies/')
                .then(response => {
                    if (response.data.length > 0) {
                        setCompanyList(response.data);
                    }
                })
        }

        fetchCompanies();
    }, [])

    function showStockValues(event) {
        event.preventDefault();

        const keyname = event.target.id;
        const companyId = event.target.value;

        const companyData = (companyId === "select") ?
            { companyName: "Not Selected", stockValues: [] } :
            companyList.find(company => company._id === companyId);

        if (companyData) {
            setDisplayList({
                ...displayList,
                [keyname]: companyData
            })
        }
    }

    return (

        <div>
            <br />
            <h3>Select Companies To Compare:</h3>
            <br /><br />
            <form>
                <div className="row">
                    <div className="col col-3 card card-body bg-light">
                        <div className="form-group">
                            <label>Company 1: </label>
                            <select required className="form-control"
                                id="selectBox1"
                                onChange={showStockValues}>
                                <option value="select"> select company </option>
                                {companyList.map(company => {
                                    return <option key={company.companyName} value={company._id}> {company.companyName} </option>;
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="col col-3 card card-body bg-light">
                        <div className="form-group">
                            <label>Company 2: </label>
                            <select required className="form-control"
                                id="selectBox2"
                                onChange={showStockValues}>
                                <option value="select"> select company </option>
                                {
                                    companyList.map(company => {
                                        return <option key={company.companyName} value={company._id}> {company.companyName} </option>;
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="col col-3 card card-body bg-light">
                        <div className="form-group">
                            <label>Company 3: </label>
                            <select required className="form-control"
                                id="selectBox3"
                                onChange={showStockValues}>
                                <option value="select"> select company </option>
                                {
                                    companyList.map(company => {
                                        return <option
                                            key={company.companyName}
                                            value={company._id}
                                        >
                                            {company.companyName}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="col col-3 card card-body bg-light">
                        <div className="form-group">
                            <label>Company 4: </label>
                            <select required className="form-control"
                                id="selectBox4"
                                onChange={showStockValues}>
                                <option value="select"> select company </option>
                                {
                                    companyList.map(company => {
                                        return <option key={company.companyName} value={company._id}> {company.companyName} </option>;
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

            </form>

            <br /><br /><br />

            <Visualization displayList={displayList} />

        </div>
    )
};