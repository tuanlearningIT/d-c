import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import _ from 'lodash';
// import * as actions from '../../../../store/actions';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''

        }
    }
    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }
    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.senRemedy(this.state)
    }

    render() {
        let { isOpenModalRemedy, dataModal, closeModal, senRemedy } = this.props
        return (
            <>
                <Modal isOpen={isOpenModalRemedy}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={closeModal}>
                        Gửi hóa đơn khám bệnh
                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input type='text' className='form-control' value={this.state.email} onChange={(event) => this.handleChangeEmail(event)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn file đơn thuốc</label>
                                <input type='file' className='form-control-file' onChange={(event) => this.handleChangeImg(event)} />
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className=''
                            color="primary"
                            onClick={() => this.handleSendRemedy()}
                        >
                            Send
                        </Button>
                        {' '}
                        <Button className='px-3' onClick={closeModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
