import * as React from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import tui from '../../../../assets/images/product/tui.png'
import trash from '../../../../assets/icon/trash.svg'
import cartIcon from '../../../../assets/icon/cart.svg'
import close from '../../../../assets/icon/closeRed.svg'

import classNames from 'classnames/bind';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { floor } from 'lodash';
import { useAuth } from '../../../../provider';
// import { getUserCartAPI } from '../../../../api/site';

const cx = classNames.bind(styles);

function Cart() {
    const numberWithCommas = (x) => {
        return floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleDelete = (cartID) => {
        console.log(cartID);
        deleteItemFromCart(cartID);
    }

    const { cart, setCart, addToCart, deleteItemFromCart } = useAuth();

    const CartProductItem = ({product}) => {
        return (
        <div className={`${cx('product-wrapper')} d-flex justify-content-between`}>
            <div className={`${cx('product-img')}`}>
                <img src={product.image}/>
            </div>
            <div className={`${cx('product-info')} d-flex flex-column`}>
                <h4>{product.name}</h4>
                <h4>x {product.quantity}</h4>
                <div className={`${cx('product-price')}`}>
                    {numberWithCommas((product.price * 
                    (1 - parseFloat(product.discount)/100)))} VND
                </div>
            </div>
            <div className={`${cx('product-delete')}`}>
                <img src={trash} onClick={() => {handleDelete(product.id, product.productId)}}/>
            </div>
        </div>)
    }

    const CartProductList = (
        <Box role="presentation">
            <div className='pb-5'>
                <img src={close} className={`${cx('cart-close')} float-end mt-5 me-5`} onClick={toggleDrawer(false)}/>
                <div className={`${cx('cart-title')}`}>
                    <h2 className={`mb-2`}>Giỏ hàng</h2>
                    <div className={`${cx('small-red-box')}`}></div>
                </div>
                {cart?.map((product, index) => (<CartProductItem product={product} key={index}/>))}
                <div className={`${cx('cart-footer')}`}>
                    <a href='/checkout'>
                        <button className={`btn-small prim-btn w-100 mb-3`}>
                            THANH TOÁN NGAY
                        </button>
                    </a>
                    <button className={`btn-small sec-btn w-100`}>
                        XEM GIỎ HÀNG
                    </button>
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <img className={`${cx('header-icon')}`} src={cartIcon} alt="Cart"/>
            </Button>
            <Drawer open={open} anchor={'right'}  onClose={(_, reason) => reason === "backdropClick" && setOpen(false)}>
                {CartProductList}
            </Drawer>
        </div>
    );
}

export default Cart;