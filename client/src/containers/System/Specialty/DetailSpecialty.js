import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss';
import DoctorExtraInfo from '../../Patient/Doctor/DoctorExtraInfo';
import DoctorSchedule from '../../Patient/Doctor/DoctorSchedule';
import ProFileDoctor from '../../Patient/Doctor/ProFileDoctor';
import { LANGUAGES } from '../../../utils';
import { getAllDetailSpecialtyById, getAllCodeServices } from '../../../services/userService';
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            let resPronvince = await getAllCodeServices('PROVINCE')
            if (res && res.errCode === 0 && resPronvince && resPronvince.errCode === 0) {
                let data = res.data;
                let arrDoctor = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resPronvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEN: 'ALL',
                        valueVI: 'Toàn quốc'
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctor: arrDoctor,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }
    handleChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctor = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctor: arrDoctor
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { language } = this.props
        let { arrDoctor, dataDetailSpecialty, listProvince } = this.state
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-specialty-header'>
                        {
                            dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div dangerouslySetInnerHTML={{
                                __html: dataDetailSpecialty.descriptionHTML
                            }} ></div>
                        }
                    </div>

                    <div className='detail-specialty-body'>
                        <div className='search-sp-doctor'>
                            <select onChange={(event) => this.handleChangeSelect(event)}>
                                {
                                    listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {
                            arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((item, index) => {
                                return (
                                    <div className='detail-specialty-content' key={index}>
                                        <div className='ds-content-left'>
                                            <div className='profile'>
                                                <ProFileDoctor doctorId={item} isShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
                                                />
                                            </div>
                                        </div>
                                        <div className='ds-content-right'>
                                            <div className='schedule'>
                                                <DoctorSchedule doctorIdFromFarent={item} />
                                            </div>
                                            <div className='extra'>
                                                <DoctorExtraInfo doctorIdFromFarent={item} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
