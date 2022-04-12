import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageHandBook.scss';
import { createNewHandBook } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }
    componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })
    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewHandBook = async () => {
        let res = await createNewHandBook(this.state)
        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
            toast.success('Add new handbook success')
        } else {
            toast.error('Something wrong...')
        }
    }
    render() {
        return (
            <div className='manage-handbook-container'>
                <div className='ms-title'>
                    Quản lý cẩm nang
                </div>
                < div className='add-new-handbook row'>
                    <div className='col-6 form-group'>
                        <label>Tên cẩm nang</label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleChangeInput(event, 'name')}
                        />

                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh cẩm nang</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleChangeImage(event)} />
                    </div>
                    <div className='col-12 mt-3'>
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-handbook'
                            onClick={() => this.handleSaveNewHandBook()}
                        >Save</button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
