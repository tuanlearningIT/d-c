import React, { Component } from 'react';

import { connect } from 'react-redux';
import './DoctorGood.scss';
import HomeHeader from './HomeHeader';
import { FormattedMessage } from 'react-intl';
import { getAllspecialty } from '../../services/userService';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions';
import { LANGUAGES } from '../../utils'
class DoctorGood extends Component {

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
    render() {

        let { arrDoctors } = this.state
        let { language } = this.props
        return (
            <div className='section-doctor-good'>
                <HomeHeader isShowBanner={false} />
                <div className='outstandingdoctor-container'>
                    <div className='outstandingdoctor-header'>
                        <span className='title-header'><FormattedMessage id="home-page.outstanding-doctor" /></span>
                    </div>
                    <div className='outstandingdoctor-body'>

                        {arrDoctors && arrDoctors.length > 0 &&
                            arrDoctors.map((item, index) => {
                                let imageBase64 = "";

                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let NameVI = `${item.positionData.valueVI} ${item.firstName} ${item.lastName}`;
                                let nameEN = `${item.positionData.valueEN} ${item.lastName} ${item.firstName}`;
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleDetailDoctors(item)}
                                    >
                                        <div className='customize-borders'>
                                            <div className='out-bg-good'>
                                                <div className='bg-image section-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }} />
                                                <div className='posittion text-center'>
                                                    <div>
                                                        {language === LANGUAGES.VI ? NameVI : nameEN}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorGood));
