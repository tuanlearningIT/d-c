import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProFileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
class ProFileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime));
    let time =
      language === LANGUAGES.VI
        ? dataTime.timeTypeData.valueVI
        : dataTime.timeTypeData.valueEN;

    let date =
      language === LANGUAGES.VI
        ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
        : moment
            .unix(+dataTime.date / 1000)
            .locale("en")
            .format("ddd - MM//DD/YYY");
    return (
      <>
        <div>
          {time} - {date}
        </div>
        <div>
          <FormattedMessage id="patient.booking-modal.freebooking" />
        </div>
      </>
    );
  };
  render() {
    let { dataProfile } = this.state;
    let {
      language,
      dataTime,
      isShowDescriptionDoctor,
      isShowLinkDetail,
      isShowPrice,
      doctorId,
    } = this.props;
    let NameVI = "";
    let nameEN = "";
    if (dataProfile && dataProfile.positionData) {
      NameVI = `${dataProfile.positionData.valueVI}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEN = `${dataProfile.positionData.valueEN}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          >
            {isShowLinkDetail === true && (
              <div className="view-detail-doctor">
                <Link to={`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
              </div>
            )}
          </div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? NameVI : nameEN}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>

        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="patient.extra-info-doctor.price" />
            {dataProfile &&
              dataProfile.Doctor_info &&
              language === LANGUAGES.VI && (
                <NumberFormat
                  className="currency"
                  value={dataProfile.Doctor_info.priceTypeData.valueVI}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VNĐ"}
                />
              )}
            {dataProfile &&
              dataProfile.Doctor_info &&
              language === LANGUAGES.EN && (
                <NumberFormat
                  className="currency"
                  value={dataProfile.Doctor_info.priceTypeData.valueEN}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                />
              )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProFileDoctor);
