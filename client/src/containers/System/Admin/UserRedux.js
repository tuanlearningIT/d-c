import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeServices } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './userRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }

    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => didupdate
        //hiện tại (this)  quá khứ  (previous)
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let genderArrs = this.props.genderRedux
            this.setState({
                genderArr: genderArrs,
                gender: genderArrs && genderArrs.length > 0 ? genderArrs[0].keyMap : ''
            })
        }
        if (prevProps.PositionRedux !== this.props.PositionRedux) {
            let positionArrs = this.props.PositionRedux
            this.setState({
                positionArr: positionArrs,
                position: positionArrs && positionArrs.length > 0 ? positionArrs[0].keyMap : ''
            })
        }
        if (prevProps.RoleRedux !== this.props.RoleRedux) {
            let roleArrs = this.props.RoleRedux
            this.setState({
                roleArr: roleArrs,
                role: roleArrs && roleArrs.length > 0 ? roleArrs[0].keyMap : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            let genderArrs = this.props.genderRedux
            let positionArrs = this.props.PositionRedux
            let roleArrs = this.props.RoleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: genderArrs && genderArrs.length > 0 ? genderArrs[0].keyMap : '',
                position: positionArrs && positionArrs.length > 0 ? positionArrs[0].keyMap : '',
                role: roleArrs && roleArrs.length > 0 ? roleArrs[0].keyMap : '',

                action: CRUD_ACTION.CREATE,
                previewURL: ''
            })
        }
    }
    handleImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewURL: objectUrl,
                avatar: base64
            })
        }

    }
    handleOpen = () => {
        if (!this.state.previewURL) return;
        this.setState({
            isOpen: true
        })
    }
    onChangeInput = (event, id) => {
        let States = { ...this.state };
        States[id] = event.target.value
        this.setState({
            ...States
        },
            () => {
                console.log("dddd", States)
            }
        )

    }
    checkValidateInput = () => {
        let valid = true
        let arrCheck = ["email", "password", "firstName", "lastName", "phonenumber", "address", "gender", "position", "role",]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                valid = false;
                alert('This input is required:' + arrCheck[i])
                break;
            }
        }
        return valid;
    }
    handleSave = (data) => {
        let { action } = this.state;
        let valid = this.checkValidateInput();
        if (valid === false) return;
        //fire redux with create
        if (action === CRUD_ACTION.CREATE) {
            this.props.createNewUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        // fire redux with edit
        if ((action === CRUD_ACTION.EDIT)) {
            this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar

            })
        }

    }
    // this.props.fetchAllUserRedux()
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary')
        }

        this.setState({
            email: user.email,
            password: 'asduf',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,

            avatar: '',
            previewURL: imageBase64,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id

        })
    }



    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender

        let { email, password, firstName, lastName, phonenumber, address, gender, position, role, avatar } = this.state
        return (

            <div className="user-redux-container" >
                <div className='title'>
                    Using Redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-12 my-3' ><b><FormattedMessage id="manage-users.add" /></b></div>
                            <div className='col-12'>{isLoadingGender === true ? 'loading gender' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.email' /></label>
                                <input
                                    value={email} onChange={(event) => this.onChangeInput(event, "email")}
                                    className='form-control' type='email'
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.password' /></label>
                                <input
                                    value={password} onChange={(event) => this.onChangeInput(event, "password")}
                                    className='form-control' type='password'
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.first-name' /></label>
                                <input
                                    value={firstName} onChange={(event) => this.onChangeInput(event, "firstName")}
                                    className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.last-name' /></label>
                                <input
                                    value={lastName} onChange={(event) => this.onChangeInput(event, "lastName")}
                                    className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.phone-number' /></label>
                                <input
                                    value={phonenumber} onChange={(event) => this.onChangeInput(event, "phonenumber")}
                                    className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-users.address' /></label>
                                <input
                                    value={address} onChange={(event) => this.onChangeInput(event, "address")}
                                    className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.gender' /></label>
                                <select className="form-control" value={gender} onChange={(event) => this.onChangeInput(event, "gender")}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option

                                                    key={index} value={item.keyMap} >{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.position' /></label>
                                <select className="form-control" value={position} onChange={(event) => this.onChangeInput(event, "position")}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option

                                                    key={index} value={item.keyMap} >{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>

                                <label><FormattedMessage id='manage-users.role' /></label>
                                <select className="form-control" value={role}
                                    onChange={(event) => this.onChangeInput(event, "role")}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.keyMap} >{language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                        })}
                                </select>

                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-users.image' /></label>
                                <div className='preview-img-container'>
                                    <input
                                        onChange={(event) => this.handleImg(event)}
                                        type='file' id='previewimg' hidden />
                                    <label className='label-upload' htmlFor='previewimg'>Tải ảnh<i className="fas fa-upload"></i></label>
                                    <div className='preview-img'
                                        // value={avatar} onChange={(event) => this.onChangeInput(event, "avatar")}
                                        onClick={() => this.handleOpen()}
                                        style={{ backgroundImage: `url(${this.state.previewURL})` }}
                                    ></div>
                                </div>

                            </div>
                            <div className='col-12 my-4' >
                                <button
                                    onClick={() => this.handleSave()}
                                    className={this.state.action === CRUD_ACTION.EDIT ? 'btn btn-warning' : 'btn btn-primary'}>
                                    <FormattedMessage id={this.state.action === CRUD_ACTION.EDIT ? 'manage-users.edit' : 'manage-users.save'} /></button>
                            </div>

                            <div className='col-12 mt-5'>
                                <TableManageUser
                                    handleEditUserFromParentProps={this.handleEditUserFromParent}
                                    action={this.state.action} />
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >


        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        PositionRedux: state.admin.positions,
        RoleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUser: (data) => dispatch(actions.editUser(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
