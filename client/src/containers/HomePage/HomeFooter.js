import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <div className='footer-content'>
                    <p>Copyright &copy; 2022 Tuan learning IT. More importmation, please visit my github.</p>
                    <div>
                        <a target="_blank" href='https://github.com/tuanlearningIT'>&rarr;click here.&larr; </a>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
