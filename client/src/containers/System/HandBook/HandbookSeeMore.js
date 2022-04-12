import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandbookSeeMore.scss';
import { getAllHandBook } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import HomeHeader from '../../HomePage/HomeHeader';
class HandbookSeeMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandBook: []
        }
    }
    async componentDidMount() {
        let res = await getAllHandBook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandBook: res.data ? res.data : []
            })
        }
    }
    handleDetailHandBook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detai-handbook/${handbook.id}`)
        }

    }
    render() {

        let { dataHandBook } = this.state
        return (
            <div className='section-hb'>
                <HomeHeader isShowBanner={false} />
                <div className='handbook-container'>
                    <div className='handbook-header'>
                        <span className='title-header'><FormattedMessage id="home-page.hand-book" /></span>
                    </div>
                    <div className='handbook-body'>

                        {
                            dataHandBook && dataHandBook.length > 0 &&
                            dataHandBook.map((item, index) => {
                                return (
                                    <>
                                        <div className='section-customize' key={index} onClick={() => this.handleDetailHandBook(item)}>
                                            <div className='bg-image section-handbook'

                                                style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='handbook-name' >{item.name}</div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandbookSeeMore));
