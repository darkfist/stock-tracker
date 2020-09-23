import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Visualization from './visualization.component'

export default function CompaniesList() {

    var [companyList, setCompanyList] = useState({
        companies: [],
    });

    var [displayList, setDisplayList] = useState({
        selectBox1: [],
        selectBox2: [],
        selectBox3: [],
        selectBox4: []
    });

    var [stockValueList, setStockValueList] = useState({
        stockValue1: [],
        stockValue2: [],
        stockValue3: [],
        stockValue4: []
    });

    useEffect(() => {
        axios.get('http://localhost:5000/companies/')
            .then(response => {
                if(response.data.length > 0) {
                    var defaultCompanyName = response.data[0].companyName;
                    var defaultStockValue = response.data[0].stockValues;

                    setCompanyList({
                        ...companyList,
                        companies: response.data
                    });
                    setDisplayList({
                        ...displayList,
                        selectBox1: [defaultCompanyName],
                        selectBox2: [defaultCompanyName],
                        selectBox3: [defaultCompanyName],
                        selectBox4: [defaultCompanyName]
                    });
                    setStockValueList({
                        ...stockValueList,
                        stockValue1: defaultStockValue,
                        stockValue2: defaultStockValue,
                        stockValue3: defaultStockValue,
                        stockValue4: defaultStockValue
                    });
                }
            })
        }, []
    )

    function showStockValues(event) {
        event.preventDefault();

        var index = event.target.options.selectedIndex;
        var companyName = event.target.options[index].label;
        
        var keyname = event.target.id;
        var companyId = event.target.value;
        
        setDisplayList({
            ...displayList,
            [keyname]: [companyName, companyId]
        })

        axios.get('http://localhost:5000/companies/' + companyId)
        .then(response => {
            if (keyname === 'selectBox1') {
                setStockValueList({
                    ...stockValueList,
                    stockValue1: response.data.stockValues
                })
            }
            if (keyname === 'selectBox2') {
                setStockValueList({
                    ...stockValueList,
                    stockValue2: response.data.stockValues
                })
            }
            if (keyname === 'selectBox3') {
                setStockValueList({
                    ...stockValueList,
                    stockValue3: response.data.stockValues
                })
            }
            if (keyname === 'selectBox4') {
                setStockValueList({
                    ...stockValueList,
                    stockValue: response.data.stockValues
                })
            }
            
        })
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
                            <label>Select Company 1: </label>
                            <select required className = "form-control" 
                                id = "selectBox1"
                                value = {displayList.selectBox1[1]} 
                                onChange = { showStockValues }>  
                                    {
                                        companyList.companies.map( company => {
                                            return <option key={company.companyName} value={company._id}> {company.companyName} </option>;
                                        })
                                    }
                            </select>
                        </div>
                    </div>

                    <div className="col col-3 card card-body bg-light">
                        <div className="form-group">
                            <label>Select Company 2: </label>
                            <select required className = "form-control" 
                                id = "selectBox2"
                                value = {displayList.selectBox2[1]} 
                                onChange = { showStockValues }>  
                                    {
                                        companyList.companies.map( company => {
                                            return <option key={company.companyName} value={company._id}> {company.companyName} </option>;
                                        })
                                    }
                            </select>
                        </div> 
                    </div>

                    <div className="col col-3 card card-body bg-light">
                        <div className="form-group">
                            <label>Select Company 3: </label>
                            <select required className = "form-control" 
                                id = "selectBox3"
                                value = {displayList.selectBox3[1]} 
                                onChange = { showStockValues }>  
                                    {
                                        companyList.companies.map( company => {
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
                            <label>Select Company 4: </label>
                            <select required className = "form-control" 
                                id = "selectBox4"
                                value = {displayList.selectBox4[1]} 
                                onChange = { showStockValues }>  
                                    {
                                        companyList.companies.map( company => {
                                            return <option key={company.companyName} value={company._id}> {company.companyName} </option>;
                                        })
                                    }
                            </select>
                        </div>
                    </div>
                </div>

            </form>

            <br /><br /><br />
            
            <Visualization stockValueList={stockValueList} displayList={displayList} />

        </div>
    )
};