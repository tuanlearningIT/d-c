import React, { Component } from 'react';

import { connect } from 'react-redux';
import './OutstandingDoctor.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { getListDoctorForSpecialty } from '../../../services/userService'


class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }


    componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }
    handleDetailDoctors = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    handleDoctor = () => {
        if (this.props.history) {
            this.props.history.push(`/doctor-good`)
        }

    }
    render() {
        let settings = this.props.settings;
        let { arrDoctors, dataSpecialty } = this.state;
        let { language } = this.props
        return (
            <div className='section-outstandingdoctor'>

                <div className='outstandingdoctor-container'>
                    <div className='outstandingdoctor-header'>
                        <span className='title-header'><FormattedMessage id="home-page.outstanding-doctor" /></span>
                        <button className='btn-header' onClick={() => this.handleDoctor()}  ><FormattedMessage id="home-page.search" /></button>
                    </div>
                    <div className='outstandingdoctor-body'>
                        <Slider {...settings}>

                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = "";

                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let NameVI = `${item.positionData.valueVI} ${item.firstName} ${item.lastName}`;
                                    let nameEN = `${item.positionData.valueEN} ${item.lastName} ${item.firstName}`;
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleDetailDoctors(item)} >
                                            <div className='customize-border'>
                                                <div className='out-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }} />
                                                    <div className='posittion text-center'>
                                                        <div>
                                                            {language === LANGUAGES.VI ? NameVI : nameEN}
                                                        </div>
                                                        <div>
                                                            {
                                                                dataSpecialty && dataSpecialty.length > 0 &&
                                                                dataSpecialty.map((item, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            {item.name}
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

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
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
