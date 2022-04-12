import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class Search extends Component {


    render() {

        return (
            <div className='search-container'>
                <i className='fas fa-search'></i>
                <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
