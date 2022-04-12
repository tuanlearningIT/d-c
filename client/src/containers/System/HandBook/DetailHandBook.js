import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailHandBook.scss';
import { LANGUAGES } from '../../../utils';
import { getAllDetailHandBookById } from '../../../services/userService';
import _ from 'lodash';

class DetailHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandBook: {},

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailHandBookById({
                id: id,

            });
            this.setState({
                dataDetailHandBook: res.data,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { language } = this.props
        let { dataDetailHandBook } = this.state
        console.log(this.state)
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-specialty-header'>
                        {
                            dataDetailHandBook && !_.isEmpty(dataDetailHandBook)
                            &&
                            <div className='' dangerouslySetInnerHTML={{
                                __html: dataDetailHandBook.descriptionHTML
                            }} ></div>
                        }
                    </div>
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);
