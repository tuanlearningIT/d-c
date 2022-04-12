import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './manageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTION, dateFormat, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor, bulkCreateScheduleService } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
class manageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            getAllTime: []
        }
    }
    componentDidMount() {
        this.props.fetchGetAllDoctor();
        this.props.fetchGetAllScheduleTime()
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVI = `${item.firstName} ${item.lastName}`;
                let labelEN = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVI : labelEN;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allTime !== this.props.allTime) {
            let data = this.props.allTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelect: false }))
            }
            this.setState({
                getAllTime: data
            })
        }

    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
        let res = await getDetailInfoDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let Markdown = res.data.Markdown
            this.setState({
                contentHTML: Markdown.contentHTML,
                description: Markdown.description,
                contentMarkdown: Markdown.contentMarkdown,
                hesOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                description: '',
                contentMarkdown: '',
                hesOldData: false
            })
        }


    }
    handleDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickButton = (time) => {
        let { getAllTime } = this.state;
        if (getAllTime && getAllTime.length > 0) {
            getAllTime = getAllTime.map(item => {
                if (item.id === time.id) item.isSelect = !item.isSelect;
                return item;
            })
            this.setState({
                getAllTime: getAllTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { getAllTime, selectedDoctor, currentDate } = this.state;
        if (!currentDate) {
            toast.error('Please select the currentDate')
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Please select the selectedDoctor')
            return;
        }
        let result = []
        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatDate = new Date(currentDate).getTime()
        if (getAllTime && getAllTime.length > 0) {

            let selectedTime = getAllTime.filter(item => item.isSelect === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatDate;
                    object.timeType = schedule.keyMap;
                    result.push(object)
                })
            } else {
                toast.error('Please selected time!')
                return;
            }
        }
        let res = await bulkCreateScheduleService({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatDate
        })
        if (res && res.errCode === 0) {
            toast.success('Save success')
        } else {
            toast.error('error save')
        }
    }
    render() {
        let { getAllTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().setDate() - 1));
        return (

            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>

                        <div className='col-6 form-group'>
                            <FormattedMessage id='manage-schedule.choose-doctor' />
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <FormattedMessage id='manage-schedule.choose-date' />
                            <DatePicker
                                className="form-control"
                                // value={this.state.currentDate}
                                value={this.state.currentDate}
                                minDate={yesterday}
                                onChange={this.handleDatePicker} />
                        </div>

                        <div className='col-12 pick-hour-container'>
                            {getAllTime && getAllTime.length > 0 &&
                                getAllTime.map((item, index) => {
                                    return (
                                        <button onClick={() => this.handleClickButton(item)} className={item.isSelect === true ? 'btn-time active' : 'btn-time'} key={index}>
                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                        </button>
                                    )
                                })}
                        </div>
                        <button onClick={() => this.handleSaveSchedule()} className='btn btn-primary'> <FormattedMessage id='manage-schedule.save' /></button>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        allTime: state.admin.allTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGetAllDoctor: (id) => dispatch(actions.fetchGetAllDoctor()),
        fetchGetAllScheduleTime: () => dispatch(actions.fetchGetAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageSchedule);
