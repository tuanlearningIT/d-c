import React, { Component } from 'react';

import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
class About extends Component {


    render() {
        let settings = this.props.settings
        return (
            <div className='section-about'>
                <div className='about-header'>
                    Truyền thông nói về Tuấn
                </div>
                <div className='about-body'>
                    <div className='about-video'>
                        <iframe width="95%" height="350px"
                            src="https://www.youtube.com/embed/UJAIDpKKsgc"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </div>
                    <div className='about-content'>
                        <p>IT được viết tắt từ Information Technology, có nghĩa là công nghệ thông tin. Những người làm công việc IT thường được gọi là lập trình viên. Họ làm các công việc liên quan đến phần mềm máy tính, thu thập thông tin, tiến hành sửa chữa, khắc phục lỗi khi cần thiết… Nhờ đó các cá nhân, tổ chức có thể quản lý và sử dụng dữ liệu một cách dễ dàng và hiệu quả.
                            Nguồn bài viết: https://jobsgo.vn/blog/dan-it-lam-gi-nhung-dieu-can-biet-ve-cong-viec-cua-nganh-it/</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(About);
