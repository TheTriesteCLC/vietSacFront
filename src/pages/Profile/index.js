import classNames from 'classnames/bind';
import styles from './index.module.css';

import userAvatar from '../../assets/images/user/userAvatar.png'

import chen from '../../assets/images/product/chen.png'
import ProductItem from '../../component/ProductItem';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from "formik";
import { Button } from "antd";
import { Input } from "formik-antd";
import { floor } from 'lodash';
import { getUserInfo, getAllCarts } from '../../api/site';
import { useAuth } from '../../provider';
import { getProductDetailAPI } from '../../api/shop';

const cx = classNames.bind(styles);

const numberWithCommas = (x) => {

    return floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const OrderItem = ({product}) => {
    return (
    <div className={`${cx('product-wrapper')} mb-5 d-flex`}>
        <div className={`${cx('product-img')}`}>
            <img src={product.image}/>
        </div>
        <div className={`${cx('product-info')} ms-4 d-flex flex-column justify-content-center`}>
            <h5>{product.name}</h5>
            <h5>x {product.quantity}</h5>
            <h5 className={`${cx('product-price')}`}>
                {`Đơn giá: ${numberWithCommas((product.price * 
                (1 - parseFloat(product.discount)/100)))}`} VND
            </h5>
        </div>
    </div>)
}

function Profile() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});
    const [userCart, setUserCart] = useState([]);
    const { userID, setToken, setUserID, cart, setCart } = useAuth();

    const fetchData = async() => {
        try {
            const userInfoData = (await getUserInfo(userID)).data;
            setUserInfo(userInfoData);
            const allCartsData = await getAllCarts();
            let userCart = allCartsData.filter((cart) => cart.userId === userID);
            userCart = await Promise.all(userCart.map(async (cart) => {
                const product = (await getProductDetailAPI(cart.productId)).data;
                return {
                    ...cart,
                    image: product.image,
                    discount: product.discount,
                    price: product.price,
                    name: product.name
                }
            }));
            setUserCart(userCart);
        }
        catch(error) {
            navigate('/error');
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleLogout = () => {
        setToken('');
        setUserID('');
        setCart([]);
        navigate('/home');
    }

    const [tabName, setTabName] = useState('user-info-btn')

    function switchTab(btn) {
        if(tabName === 'user-info-btn' && btn.target.id === 'checkout-btn') {
            document.getElementById(btn.target.id).classList.add(cx('chosen-tab'));
            document.getElementById('user-info-btn').classList.remove(cx('chosen-tab'));

            document.getElementById('checkout-tab').style.display = "block";
            document.getElementById('user-info-tab').style.display = "none";
        }else if(tabName === 'checkout-btn' && btn.target.id === 'user-info-btn'){
            document.getElementById(btn.target.id).classList.add(cx('chosen-tab'));
            document.getElementById('checkout-btn').classList.remove(cx('chosen-tab'));

            document.getElementById('user-info-tab').style.display = "block";
            document.getElementById('checkout-tab').style.display = "none";
        }
        setTabName(btn.target.id);
    }

    return (
        <div className={`${cx('wrapper')} d-flex `}>
            <div className={`${cx('user-nav-section')}`}>
                <div className={`${cx('user-info')} mx-auto d-flex flex-column mb-4 text-center`}>
                    <img src={userInfo.avatar || userAvatar}/>
                    <h1>{userInfo.firstName} {userInfo.lastName}</h1>
                    <p>{userInfo.email}</p>
                </div>
                <div className={`d-flex flex-column`}>
                    <button className={`${cx('switch-tab-btn')} ${cx('chosen-tab')} mb-4`} id='user-info-btn' onClick={switchTab}>Tài khoản của tôi</button>
                    <button className={`${cx('switch-tab-btn')}`} id='checkout-btn' onClick={switchTab}>Đơn hàng </button>
                </div>
                <button className={`btn-exlarge prim-btn ${cx('logout-btn')} mt-5`} onClick={handleLogout}>Đăng xuất</button>
            </div>
            <Formik
            // initialValues={name}
            onSubmit={(values) => {
                // setName(values);
                // next();
            }}
            validate={(values) => {
                const errors = {};
                return errors;
            }}
            >
                {({ handleSubmit, errors }) => {
                    return (
            <div className={`${cx('tab-option')}`} id='user-info-tab'>
                <h2 className='mb-5'>Thông tin cá nhân</h2>
                <div className={`${cx('user-info-inputs')}`}>
                    <div className={`d-flex flex-column`}>
                        <div className='w-100 d-flex justify-content-between'>
                            <div className={`${cx('input-name-wapper')} ${errors.lastName && "input-error"} d-flex flex-column`}>
                                <label className={cx('input-title')}>Họ *</label>
                                <Input name={"lastName"}  className={cx('info-input')} placeholder="Nhập họ của bạn" value={userInfo.lastName}/>
                                <p className={cx('error-feedback')}>{errors.lastName}</p>
                            </div>
                            <div className={`${cx('input-name-wapper')} ${errors.firstName && "input-error"} d-flex flex-column`}>
                                <label className={cx('input-title')}>Tên *</label>
                                <Input name={"firstName"}  className={cx('info-input')} placeholder="Nhập tên của bạn" value={userInfo.firstName}/>
                                <p className={cx('error-feedback')}>{errors.firstName}</p>
                            </div>
                            <div className={`${cx('input-name-wapper')} ${errors.firstName && "input-error"} d-flex flex-column`}>
                                <label className={cx('input-title')}>Số điện thoại</label>
                                <Input name={"phone"}  className={cx('info-input')} placeholder="Nhập số điện thoại của bạn" value={userInfo.phone}/>
                                <p className={cx('error-feedback')}>{errors.firstName}</p>
                            </div>
                        </div>
                        <div className='w-100 d-flex justify-content-between'>
                            <div className={`${cx('input-name-wapper')} ${errors.lastName && "input-error"} w-100 d-flex flex-column`}>
                                <label className={cx('input-title')}>Địa chỉ *</label>
                                <Input name={"address"}  className={cx('info-input')} placeholder="Nhập dịa chỉ của bạn" value={userInfo.address}/>
                                <p className={cx('error-feedback')}>{errors.lastName}</p>
                            </div>
                        </div>
                        <div className={`w-100 mt-3 d-flex justify-content-between`}>
                            <div className={`${cx('input-add-wrapper')}`}>
                                <select
                                className={`${cx('input-add')} w-100`}
                                name="city"
                                placeholder="Chọn thành phố"
                                id="city"
                                >
                                <option value="0">Tỉnh Thành</option>
                                </select>
                            </div>
                            <div className={`${cx('input-add-wrapper')}`}>
                                <select
                                className={`${cx('input-add')} w-100`}
                                name="district"
                                placeholder="Chọn quận"
                                id="district"
                                >
                                <option value="0">Quận Huyện</option>
                                
                                </select>
                            </div>
                            <div className={`${cx('input-add-wrapper')}`}>
                                <select
                                className={`${cx('input-add')} w-100`}
                                name="ward"
                                placeholder="Chọn phường"
                                id="ward"
                                >
                                <option value="0">Phường Xã</option>
                                <option value="0">Phường Xã</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>     
                </div>
                <h2 className='my-5'>Thông tin tài khoản</h2>
                <div className={`${cx('user-account-inputs')}`}>
                    <div className='w-100 d-flex justify-content-between'>
                        <div className={`${cx('input-account-wrapper')} ${errors.lastName && "input-error"} d-flex flex-column`}>
                            <label className={cx('input-title')}>Email *</label>
                            <Input name={"email"}  className={cx('account-input')} placeholder="Nhập email của bạn" value={userInfo.email}/>
                            <p className={cx('error-feedback')}>{errors.lastName}</p>
                        </div>
                        <div className={`${cx('input-account-wrapper')} ${errors.firstName && "input-error"} d-flex flex-column`}>
                            <label className={cx('input-title')}>Mật khẩu *</label>
                            <Input name={"password"}  className={cx('account-input')} placeholder="Nhập mật khẩu của bạn" value={userInfo.password}/>
                            <p className={cx('error-feedback')}>{errors.firstName}</p>
                        </div>
                    </div>
                </div>     
            </div>
            );}}
            </Formik>
            <div className={`${cx('tab-option')}`} id='checkout-tab'>
                <div className={`d-flex justify-content-between mb-5`}>
                    <h2>Lịch sử mua hàng</h2>
                    <h2>Đơn hàng đang giao</h2>
                </div>
                <div className={`px-5`}>
                    {userCart.map((product, index) => <OrderItem product={product} key={index}/>)}
                </div>
            </div>
            <Helmet>
                <script >
                    document.getElementById('user-info-tab').style.display = "block";
                    document.getElementById('checkout-tab').style.display = "none";
                </script>
            </Helmet>
        </div>
    )
}

export default Profile;