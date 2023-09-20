import React from 'react';
import './search.scss';
import Toparea from '../../components/toparea/toparea';
import Navbar from '../../components/navbar/navbar';

function Searh() {
    return (
        <>
        <div className="search-wrapper">
            <Toparea/>
            <section className="container search-result"></section>
        </div>
            <Navbar/>
        </>
    );
}

export default Searh;