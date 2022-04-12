import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter();
    }
    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }
    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }
    toggle = () => {
        this.props.toggle()
    }
    handlonChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameters: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
                className='modal-user-container'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Edit Users
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='imput-container'>
                            <label>Email</label>
                            <input disabled type='text' value={this.state.email} onChange={(event) => this.handlonChangeInput(event, 'email')} />
                        </div>
                        <div className='imput-container'>
                            <label>Password</label>
                            <input disabled type='password' value={this.state.password} onChange={(event) => this.handlonChangeInput(event, 'password')} />
                        </div>

                    </div>
                    <div className='modal-user-body'>
                        <div className='imput-container'>
                            <label>firstName</label>
                            <input type='tex' t value={this.state.firstName} onChange={(event) => this.handlonChangeInput(event, 'firstName')} />
                        </div>
                        <div className='imput-container'>
                            <label>lastName</label>
                            <input type='text' value={this.state.lastName} onChange={(event) => this.handlonChangeInput(event, 'lastName')} />
                        </div>

                    </div>
                    <div className='modal-user-body'>
                        <div className='imput-container max-w-input'>
                            <label>address</label>
                            <input type='text' value={this.state.address} onChange={(event) => this.handlonChangeInput(event, 'address')} />
                        </div>

                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color="primary"
                        onClick={() => this.handleSaveUser()}
                    >
                        Save Changes
                    </Button>
                    {' '}
                    <Button className='px-3' onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

