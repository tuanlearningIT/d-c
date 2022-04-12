import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfo from './DoctorExtraInfo';
import LikeAndShare from '../socialPlugin/LikeAndShare';
import Comment from '../socialPlugin/Comment';

require('dotenv').config();
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctors: {},
            currentDoctorId: -1
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctors: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {

        let { detailDoctors } = this.state;
        let { language } = this.props;
        let NameVI = '';
        let nameEN = '';
        if (detailDoctors && detailDoctors.positionData) {
            NameVI = `${detailDoctors.positionData.valueVI} ${detailDoctors.firstName} ${detailDoctors.lastName}`;
            nameEN = `${detailDoctors.positionData.valueEN} ${detailDoctors.lastName} ${detailDoctors.firstName}`;
        }
        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ?
            "https://chatbot-8-3.herokuapp.com/" : window.location.href;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctors && detailDoctors.image ? detailDoctors.image : ''})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? NameVI : nameEN}
                            </div>
                            <div className='down'>
                                {detailDoctors && detailDoctors.Markdown && detailDoctors.Markdown.description &&
                                    <span>
                                        {detailDoctors.Markdown.description}
                                    </span>}
                                <div className='like-share-plugin'>
                                    <LikeAndShare dataHref={currentURL} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromFarent={this.state.currentDoctorId} />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfo doctorIdFromFarent={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div className='detail-doctor'>
                        <div className='detail-body'>
                            {detailDoctors && detailDoctors.Markdown && detailDoctors
                                .Markdown.contentHTML &&
                                <div dangerouslySetInnerHTML={{
                                    __html: detailDoctors.Markdown.contentHTML
                                }} >
                                </div>
                            }
                        </div>
                    </div>
                    <div className='comment-doctor'>
                        <Comment
                            dataHref={currentURL}
                            width={"100%"}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
