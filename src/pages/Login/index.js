import classNames from 'classnames/bind';

import styles from './index.module.css'

import logo from '../../assets/logo/logo.png'

const cx = classNames.bind(styles);

const Login = () => {
    return (
        <div className={`${cx('wrapper')} d-flex justify-content-center align-items-center`}>
           <div className={`${cx('section-login')}`} >
                <div className={`row h-100`}>
                    <div className={`${cx('section-login-logo')} col`}>
                        <img src={logo}/>
                        <div className='mt-4'>
                            <h1>Đăng nhập vào tài khoản của bạn</h1>
                        </div>
                    </div>
                    <div className={`${cx('section-login-logo')} col d-flex align-items-center`}>
                        <div className='col'>
                            <div className={`row`}>
                                <p className={cx('input-title')}>email/sđt</p>
                                <input className={cx('login-email')} type='email' placeholder='Nhập email của bạn'/>
                            </div>
                            <div className={`row mt-4`}>
                                <p className={cx('input-title')}>mật khẩu</p>
                                <input className={cx('login-password')} type='password' placeholder='Nhập mật khẩu của bạn'/>
                            </div>
                            <button className={`${cx('btn-login')} float-end`}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Login;