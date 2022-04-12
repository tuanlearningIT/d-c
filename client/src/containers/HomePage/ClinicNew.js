import React, { Component } from "react";

import { connect } from "react-redux";
import "./ClinicNew.scss";
import HomeHeader from "../HomePage/HomeHeader";
import { FormattedMessage } from "react-intl";
import { getAllClinic } from "../../services/userService";
import { withRouter } from "react-router";

class ClinicNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }
  handleDetaitClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detai-clinic/${clinic.id}`);
    }
  };
  ren;
  render() {
    let { dataClinic } = this.state;
    return (
      <div className="section-clinic">
        <HomeHeader isShowBanner={false} />
        <div className="medicalfacility-container">
          <div className="medicalfacility-header">
            <span className="title-header">
              <FormattedMessage id="home-page.health-facilities" />
            </span>
          </div>
          <div className="medicalfacility-body">
            {dataClinic &&
              dataClinic.length > 0 &&
              dataClinic.map((item, index) => {
                return (
                  <>
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleDetaitClinic(item)}
                    >
                      <div
                        className="bg-image section-specialty"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="specialty-name">{item.name}</div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClinicNew)
);
