import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SpecialistExamination.scss';
import HomeHeader from '../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl';
import { getAllspecialty } from '../../services/userService';
import { withRouter } from 'react-router';

class SpecialistExamination extends Component {
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
    handleDetailDoctors = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detai-specialty/${specialty.id}`)
        }
    }
    render() {

        let { dataSpecialty } = this.state
        return (
            <div className='section-se'>
                <HomeHeader isShowBanner={false} />
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-header'><FormattedMessage id='home-page.specialty-poplular' /></span>
                    </div>
                    <div className='specialty-body'>
                        {
                            dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <>
                                        <div className='section-customize' key={index} onClick={() => this.handleDetailDoctors(item)}>
                                            <div className='bg-image section-specialty'

                                                style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='specialty-name' >{item.name}</div>
                                        </div>
                                    </>
                                )
                            })
                        }
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialistExamination));
