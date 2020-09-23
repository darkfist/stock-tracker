import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Stock Tracker Application</Link>

        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Companies</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/add-company" className="nav-link">Add Company</Link>
                </li>
            </ul>
        </div>
        </nav>
    )
};