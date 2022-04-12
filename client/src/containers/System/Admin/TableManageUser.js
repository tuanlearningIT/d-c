import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!



class TableManageUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userRedux: []
        }

    }

    componentDidMount() {
        this.props.fetchAllUserRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users
            })
        }
    }
    handlDeleteUser = (user) => {
        this.props.deleleUser(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentProps(user);

    }
    handleEditorChange = (html, text) => {
        console.log('handleEditorChange', html, text);
    }
    render() {
        let arrUser = this.state.userRedux
        return (
            <>
                <table id="TableManageUser" >
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUser && arrUser.length > 0 &&
                            arrUser.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)} ><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handlDeleteUser(item)} ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}


                    </tbody>

                </table>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleleUser: (id) => dispatch(actions.deleleUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
