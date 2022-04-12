
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './PageNotFound.scss'

import HomeHeader from '../HomeHeader';
class PageNotFound extends Component {

    render() {

        return (
            <>
                <HomeHeader />
                <div className='page-not-found'>
                    <div className='container'>
                        <div className='row'>
                            <div className='content-page-not-found'>
                                <h1>Page not found</h1>
                            </div>

                        </div>

                    </div>
                </div>


            </>

        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);