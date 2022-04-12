import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { forgot: false };
    }

    login() {
        alert('Login will work here');
    }
    forgot() {
        this.setState({ forgot: true })
    }

    render() {
        return (
            <div>
                {this.state.forgot === false && <div>
                    Username: <input /> <br />
                    Password: <input /><br />
                    <button onClick={this.forgot.bind(this)}>Forgot</button>
                    <button onClick={this.login.bind(this)}>Login</button>
                </div>}
                {this.state.forgot === true && <ForgotPassword />}
            </div>
        );
    }
}

class ForgotPassword extends React.Component {

    reset() {
        alert('Password is sent to your email');
    }

    render() {
        return (<div><h1>Write your email</h1>
            <input />
            <button onClick={this.reset.bind(this)}>Reset Password</button>
            {/* <div className='option'>
                                    <div className='child-option' onClick={() => this.handleSpecialty()}>
                                        <div className='icon-child'>
                                            <i className="fas fa-hospital"></i>
                                        </div>
                                        <div className='text-child'>
                                            <FormattedMessage id="banner.examination" /><br />
                                            <FormattedMessage id="banner.specialist" />
                                        </div>
                                    </div>

                                    <div className='child-option'>
                                        <div className='icon-child'>
                                            <i className='fas fa-mobile-alt'></i>
                                        </div>
                                        <div className='text-child'>
                                            <FormattedMessage id="banner.examination" /> <br />
                                            <FormattedMessage id="banner.fromfaraway" />
                                        </div>
                                    </div>
                                    <div className='child-option'>
                                        <div className='icon-child'>
                                            <i className='fas fa-procedures'></i>
                                        </div>
                                        <div className='text-child'>
                                            <FormattedMessage id="banner.examination" /> <br />
                                            <FormattedMessage id="banner.generality" />
                                        </div>
                                    </div>
                                    <div className='child-option'>
                                        <div className='icon-child'>
                                            <i className="fas fa-notes-medical"></i>
                                        </div>
                                        <div className='text-child'>
                                            <FormattedMessage id="banner.test" /> <br />
                                            <FormattedMessage id="banner.medicine" />
                                        </div>
                                    </div>
                                    <div className='child-option'>
                                        <div className='icon-child'>
                                            <i className='fas fa-user-md '></i>
                                        </div>
                                        <div className='text-child'>
                                            <FormattedMessage id="banner.health" /> <br />
                                            <FormattedMessage id="banner.morale" />
                                        </div>
                                    </div>
                                    <div className='child-option'>
                                        <div className='icon-child'>
                                            <i className="fas fa-hospital"></i>
                                        </div>
                                        <div className='text-child'>
                                            <FormattedMessage id="banner.examination" /> <br />
                                            <FormattedMessage id="banner.dentistry" />
                                        </div>
                                    </div>
                                </div> */}
        </div>)
    }
}