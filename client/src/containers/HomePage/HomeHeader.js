import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import Search from "./search/Search";

class HomeHeader extends Component {
  handlechangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handlePushHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  handleSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/specialty`);
    }
  };
  handleDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/doctor-good`);
    }
  };
  handleClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/clinic`);
    }
  };
  render() {
    let language = this.props.language;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div className="logo" onClick={() => this.handlePushHome()}>
                <div onClick={() => this.handlePushHome()}>
                  TUAN DOCTOR CARE
                </div>
              </div>
            </div>
            <div className="center-content">
              <div
                className="child-content"
                onClick={() => this.handleSpecialty()}
              >
                <div>
                  {" "}
                  <b>
                    <FormattedMessage id="homeheader.speciality" />{" "}
                  </b>{" "}
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div
                className="child-content"
                onClick={() => this.handleClinic()}
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.healthfacility" />
                  </b>{" "}
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.selectroom" />
                </div>
              </div>
              <div
                className="child-content"
                onClick={() => this.handleDoctor()}
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                  <div className="subs-title">
                    <FormattedMessage id="homeheader.selectdoctor" />
                  </div>
                </div>
              </div>
              {/* <div className='child-content'>
                                <div ><b><FormattedMessage id="homeheader.package" /></b>
                                    <div className='subs-title'><FormattedMessage id="homeheader.generalhealt" /></div>
                                </div>
                            </div> */}
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />{" "}
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.handlechangeLanguage(LANGUAGES.VI)}>
                  VI
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.handlechangeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <>
              <div className="content-up">
                <div className="content-title">
                  <div className="title1">
                    <FormattedMessage id="banner.title1" />
                  </div>
                  <div className="title2">
                    <FormattedMessage id="banner.title2" />
                  </div>
                  {/* <div className="search">
                    <Search />
                  </div> */}
                </div>
              </div>
              <div className="content-down"></div>
            </>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
