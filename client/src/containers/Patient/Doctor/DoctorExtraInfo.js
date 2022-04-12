import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorExtraInfo.scss';
import { getExtraDoctorInfoById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl'

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailDoctor: false,
            extraInfo: {}
        }
    }
    async componentDidMount() {

        let res = await getExtraDoctorInfoById(this.props.doctorIdFromFarent);
        this.setState({
            extraInfo: res.data
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromFarent !== prevProps.doctorIdFromFarent) {
            let res = await getExtraDoctorInfoById(this.props.doctorIdFromFarent);
            this.setState({
                extraInfo: res.data
            })
        }
    }
    showHideDetailDoctor = (status) => {
        this.setState({
            isShowDetailDoctor: status
        })
    }

    render() {
        let { isShowDetailDoctor, extraInfo } = this.state;
        let { language } = this.props
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id='patient.extra-info-doctor.text-address' />
                    </div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}

                    </div>
                    <hr />
                </div>
                <div className='content-down'>
                    {isShowDetailDoctor === false &&
                        <div className='short-info'>
                            <FormattedMessage id='patient.extra-info-doctor.price' />
                            {
                                extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI &&
                                <NumberFormat

                                    value={extraInfo.priceTypeData.valueVI}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VNĐ'} />
                            }
                            {
                                extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN &&
                                <NumberFormat

                                    value={extraInfo.priceTypeData.valueEN}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'} />
                            }
                            <span className="currency" onClick={() => this.showHideDetailDoctor(true)}>
                                <FormattedMessage id='patient.extra-info-doctor.detail' />
                            </span>
                        </div>
                    }
                    {isShowDetailDoctor === true &&
                        <>
                            <div className='title-price'>
                                <FormattedMessage id='patient.extra-info-doctor.price' />
                            </div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id='patient.extra-info-doctor.price' />
                                    </span>
                                    <span className='right'>
                                        {
                                            extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfo.priceTypeData.valueVI}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VNĐ'} />
                                        }
                                        {
                                            extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                className="currency"
                                                value={extraInfo.priceTypeData.valueEN}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'} />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {
                                        extraInfo && extraInfo.note ? extraInfo.note : ''
                                    }
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id='patient.extra-info-doctor.payment' />
                                {
                                    extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI
                                        ? extraInfo.paymentTypeData.valueVI : ''
                                }
                                {
                                    extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN
                                        ? extraInfo.paymentTypeData.valueEN : ''
                                }
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailDoctor(false)}>
                                    <FormattedMessage id='patient.extra-info-doctor.hide-price' />
                                </span>
                            </div>
                        </>}
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
