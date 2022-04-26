import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllspecialty, getAllClinic } from "../../../services/userService";
import * as actions from "../../../store/actions";
import "./Search.scss";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValueSearch: "",
      filteredData: [],
      filteredData1: [],
      filteredData2: [],
      dataSpecialty: [],
      arrDoctors: [],
      dataClinic: [],
      isShow: false,
    };
  }

  async componentDidMount() {
    this.getDataSpecialty();
    this.getDataClinic();
    this.props.loadTopDoctors();
  }
  handleIsShow = (e) => {
    this.setState({
      isShow: true,
    });
  };
  handleBlur = () => {
    this.setState({
      isShow: false,
    });
  };
  handleClose = () => {
    this.setState({
      inputValueSearch: "",
    });
  };
  handleChangeSearch = (e) => {
    const inputValueSearch = e.target.value;
    // const { dataSpecialty } = this.state;
    this.setState((prevState) => {
      //let data = dataSpecialty.forEach((el) => (el.id = Math.random()));
      const filteredData = prevState.dataSpecialty.filter((element) => {
        return element.name
          .toLowerCase()
          .includes(inputValueSearch.toLowerCase());
      });
      const filteredData1 = prevState.dataClinic.filter((element) => {
        return element.name
          .toLowerCase()
          .includes(inputValueSearch.toLowerCase());
      });
      const filteredData2 = prevState.arrDoctors.filter((item) => {
        let nameVI = `${item.positionData.valueVI} ${item.firstName} ${item.lastName}`;
        let nameEN = `${item.positionData.valueEN} ${item.lastName} ${item.firstName}`;
        let { language } = this.props;
        if (language === LANGUAGES.VI) {
          return nameVI.toLowerCase().includes(inputValueSearch.toLowerCase());
        } else {
          return nameEN.toLowerCase().includes(inputValueSearch.toLowerCase());
        }
      });
      return {
        inputValueSearch,
        filteredData,
        filteredData1,
        filteredData2,
      };
    });
  };
  getDataSpecialty = async () => {
    let res1 = await getAllspecialty();
    const { inputValueSearch } = this.state;
    // let data = res1.data.forEach((el) => (el.id = Math.random()));
    if (res1 && res1.errCode === 0) {
      const filteredData = res1.data.filter((element) => {
        return element.name
          .toLowerCase()
          .includes(inputValueSearch.toLowerCase());
      });

      this.setState({
        dataSpecialty: res1.data,
        filteredData,
      });
    }
  };
  getDataClinic = async () => {
    let res2 = await getAllClinic();
    const { inputValueSearch } = this.state;
    // let data = res1.data.forEach((el) => (el.id = Math.random()));
    if (res2 && res2.errCode === 0) {
      const filteredData1 = res2.data.filter((element) => {
        return element.name
          .toLowerCase()
          .includes(inputValueSearch.toLowerCase());
      });

      this.setState({
        dataClinic: res2.data,
        filteredData1,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      const { inputValueSearch } = this.state;
      const filteredData2 = this.props.topDoctors.filter((item) => {
        let nameVI = `${item.positionData.valueVI} ${item.firstName} ${item.lastName}`;
        let nameEN = `${item.positionData.valueEN} ${item.lastName} ${item.firstName}`;
        let { language } = this.props;
        if (language === LANGUAGES.VI) {
          return nameVI.toLowerCase().includes(inputValueSearch.toLowerCase());
        } else {
          return nameEN.toLowerCase().includes(inputValueSearch.toLowerCase());
        }
      });

      this.setState({
        arrDoctors: this.props.topDoctors,
        filteredData2,
      });
    }
  }
  handleDetailDoctors = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  handleDetailSpecialty = (specialty) => {
    if (this.props.history) {
      this.props.history.push(`/detai-specialty/${specialty.id}`);
    }
  };
  handleDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detai-clinic/${clinic.id}`);
    }
  };
  render() {
    let { language } = this.props;
    let { filteredData2, isShow, filteredData1, filteredData } = this.state;
    console.log({ user: this.state });
    return (
      <>
        <div className="search-title">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Tìm chuyên khoa khám bệnh"
            onClick={this.handleIsShow}
            onBlur={this.handleBlur}
            onChange={this.handleChangeSearch}
            value={this.state.inputValueSearch}
          />
          <i className="fas fa-times" onClick={this.handleClose}></i>
        </div>
        {isShow && (
          <div className="search-body">
            {filteredData.map((item) => {
              return (
                <div
                  onClick={() => this.handleDetailSpecialty(item)}
                  className="search-content"
                  key={item.id}
                >
                  {item.name}
                </div>
              );
            })}
            {filteredData2.map((item) => {
              let nameVI = `${item.positionData.valueVI} ${item.firstName} ${item.lastName}`;
              let nameEN = `${item.positionData.valueEN} ${item.lastName} ${item.firstName}`;
              return (
                <div
                  onClick={() => this.handleDetailDoctors(item)}
                  className="search-content"
                  key={item.id}
                >
                  {language === LANGUAGES.VI ? nameVI : nameEN}
                </div>
              );
            })}
            {filteredData1.map((item) => {
              return (
                <div
                  onClick={() => this.handleDetailClinic(item)}
                  className="search-content"
                  key={item.id}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
