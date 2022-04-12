import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl'
import { getListPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenModalRemedy: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.getDataPatient()
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleComfirm = (item) => {

        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenModalRemedy: true,
            dataModal: data
        })
    }
    closeModal = () => {
        this.setState({
            isOpenModalRemedy: false,
            dataModal: {}
        })
    }
    senRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy success')
            this.closeModal()
            await this.getDataPatient()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Something wrongs...')
        }
        console.log('data1', res)
    }
    render() {
        let { language } = this.props
        let { dataPatient, isOpenModalRemedy, dataModal } = this.state
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='manage-patient-title my-5'>
                            Quản lý lịch khám bệnh của người bệnh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-6 form-group'>
                                <label>Ngày khám</label>
                                <DatePicker
                                    className="form-control"
                                    // value={this.state.currentDate}
                                    value={this.state.currentDate}
                                    // minDate={yesterday}
                                    onChange={this.handleChangeDatePicker} />
                            </div>
                            <div className='manage-patient-table col-12 my-5'>
                                <table id="TableManagepatient" >
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Email</th>
                                            <th>Họ và tên</th>
                                            <th>Address</th>
                                            <th>Giới tính</th>
                                            <th>Action</th>
                                        </tr>
                                        {
                                            dataPatient && dataPatient.length > 0 ?
                                                dataPatient.map((item, index) => {
                                                    let time = language === LANGUAGES.VI ?
                                                        item.timeTypeDataPatient.valueVI : item.timeTypeDataPatient.valueEN;
                                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVI :
                                                        item.patientData.genderData.valueEN
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>

                                                            <td>{time}</td>
                                                            <td>{item.patientData.email}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{gender}</td>
                                                            <td>
                                                                <button className='btn-confirm' onClick={() => this.handleComfirm(item)} >Xác nhận</button>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan={7} style={{ textAlign: 'center' }}>no data</td>
                                                </tr>
                                        }

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModalRemedy={isOpenModalRemedy}
                        dataModal={dataModal}
                        closeModal={this.closeModal}
                        senRemedy={this.senRemedy}
                    />
                </LoadingOverlay>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
