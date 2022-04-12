import React, { Component } from 'react';

import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleDetailDoctors = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detai-clinic/${clinic.id}`)
        }


    }
    handleClinic = () => {
        if (this.props.history) {
            this.props.history.push(`/clinic`)
        }

    }
    render() {
        let settings = this.props.settings
        let { dataClinic } = this.state
        return (
            <div className='section-medicalfacility'>

                <div className='medicalfacility-container'>
                    <div className='medicalfacility-header'>
                        <span className='title-header'><FormattedMessage id="home-page.health-facilities" /></span>
                        <button className='btn-header' onClick={() => this.handleClinic()}><FormattedMessage id="home-page.search" /></button>
                    </div>
                    <div className='medicalfacility-body'>
                        <Slider {...settings}>
                            {
                                dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index}>
                                            <div className='bg-image section-medical-facility' onClick={() => this.handleDetailDoctors(item)}
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='clinic-name'>{item.name}</div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
