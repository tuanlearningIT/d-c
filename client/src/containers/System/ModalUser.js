import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { emitter } from '../../utils/emitter'
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
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
                    Create new Users
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='imput-container'>
                            <label>Email</label>
                            <input type='text' value={this.state.email} onChange={(event) => this.handlonChangeInput(event, 'email')} />
                        </div>
                        <div className='imput-container'>
                            <label>Password</label>
                            <input type='password' value={this.state.password} onChange={(event) => this.handlonChangeInput(event, 'password')} />
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
                            <input type='text' value={this.state.addrress} onChange={(event) => this.handlonChangeInput(event, 'address')} />
                        </div>

                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color="primary"
                        onClick={() => this.handleAddNewUser()}
                    >
                        Add new user
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

