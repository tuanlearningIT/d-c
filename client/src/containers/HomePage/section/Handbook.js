import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Handbook.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllHandBook } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
class Handbook extends Component {
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

    handlePushHandBook = () => {
        if (this.props.history) {
            this.props.history.push(`/handbook`)
        }
    }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2
        };
        let { dataHandBook } = this.state
        return (
            <div className='section-handbook'>

                <div className='handbook-container'>
                    <div className='handbook-header'>
                        <span className='title-header'><FormattedMessage id="home-page.hand-book" /></span>
                        <button className='btn-header' onClick={() => this.handlePushHandBook()}><FormattedMessage id="home-page.more-info" /></button>
                    </div>
                    <div className='handbook-body'>
                        <Slider {...settings}>
                            {
                                dataHandBook && dataHandBook.length > 0 &&
                                dataHandBook.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={item.id} onClick={() => this.handleDetailHandBook(item)}>
                                            <div className='bg-image section-specialty'

                                                style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='handbook-name' >{item.name}</div>
                                        </div>

                                    )
                                })
                            }


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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
