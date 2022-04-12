import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { getAllspecialty } from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllspecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    handleDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detai-specialty/${specialty.id}`)
        }

    }
    handleSpecialty = () => {
        if (this.props.history) {
            this.props.history.push(`/specialty`)
        }

    }
    render() {
        let settings = this.props.settings
        let { dataSpecialty } = this.state
        return (
            <div className='section-specialty'>

                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-header'><FormattedMessage id='home-page.specialty-poplular' /></span>
                        <button className='btn-header' onClick={() => this.handleSpecialty()}><FormattedMessage id='home-page.more-info' /></button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                            {
                                dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={item.id}>
                                            <div className='bg-image section-specialty'
                                                onClick={() => this.handleDetailSpecialty(item)}
                                                style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='specialty-name ' >{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
