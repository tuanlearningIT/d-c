import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailClinic.scss';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProFileDoctor from '../Doctor/ProFileDoctor';
import { LANGUAGES } from '../../../utils';
import { getAllDetailClinicById, getAllClinic } from '../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            dataDetailClinic: {},

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailClinicById({
                id: id,

            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctor = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctor: arrDoctor,

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
        let { arrDoctor, dataDetailClinic, } = this.state
        return (
            <>
                <div className='detail-clinic-container'>
                    <HomeHeader />
                    <div className='detail-clinic-header'>
                        {
                            dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <>
                                <div>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{
                                    __html: dataDetailClinic.descriptionHTML
                                }} ></div>
                            </>

                        }
                    </div>

                    <div className='detail-clinic-body'>

                        {
                            arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((item, index) => {
                                return (
                                    <div className='detail-clinic-content' key={index}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
