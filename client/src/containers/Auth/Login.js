import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { withRouter } from 'react-router';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowpass: false,
            errMessage: ''
        }
    }
    handleOnchangeInputUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }
    handleOnchangeInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleOnclick = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            } if (data && data.errCode === 0) {
                //todo 
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.Message
                    })
                }
            }
        }
    }
    handleOnclickShow = () => {
        this.setState({
            isShowpass: !this.state.isShowpass
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleOnclick()
        }
    }
    handleForgot = () => {
        this.props.history.push(`/forgot`)
    }
    render() {

        return (
            <div className='login-background'>
                <div className='login container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>
                            Login
                        </div>
                        <div className='col-12 form-group login-input' >
                            <label style={{ 'fontSize': '17px' }}>Username</label>
                            <input onChange={(event) => this.handleOnchangeInputUsername(event)} value={this.state.username} type='text' className='form-control active' placeholder='Enter your username' />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label style={{ 'fontSize': '17px' }}>Password</label>
                            <div className='custom-input'>
                                <input
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                    onChange={(event) => this.handleOnchangeInputPassword(event)} value={this.state.password} type={this.state.isShowpass ? 'text' : 'password'} className='form-control active' placeholder='Enter your password' />
                                <span onClick={() => this.handleOnclickShow()}>
                                    <i className={this.state.isShowpass ? "far fa-eye" : "far fa-eye-slash"}></i></span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12' style={{ 'fontSize': '21px' }}>
                            <button onClick={() => this.handleOnclick()} className='btn-login'  >Log in</button>
                        </div>
                        {/* 
                        <div className='col-12'>
                            <span className='forgot' onClick={() => this.handleForgot()}>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='or-sign '>Or sign in with:</span>
                        </div>
                        <div className='col-12 social-login'>

                            <i className="fab fa-facebook"></i>
                            <i className="fab fa-google-plus"></i>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

