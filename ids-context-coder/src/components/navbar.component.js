
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">IDS Context Coder</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Coding</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create_coding_block" className="nav-link">Create Coder</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}