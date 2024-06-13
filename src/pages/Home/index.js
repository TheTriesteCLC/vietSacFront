import classNames from 'classnames/bind';
import styles from './index.module.css';

import ProductCard from '../../component/ProductCard';

import homeBanner from '../../assets/images/homeBanner.png'

import gomCategory from '../../assets/images/category/gomCategory.png'
import thocamCategory from '../../assets/images/category/thocamCategory.png'
import danlatCategory from '../../assets/images/category/danlatCategory.png'

import chen from '../../assets/images/product/chen.png'
import ghe from '../../assets/images/product/ghe.png'
import vi from '../../assets/images/product/vi.png'
import tui from '../../assets/images/product/tui.png'
import { useEffect, useState } from 'react';
import { getProductsHotDealsAPI } from '../../api/site';

const cx = classNames.bind(styles);

function Home() {
    const fetchData = async() => {
        setProductsHotDeal(await getProductsHotDealsAPI());
    }

    const [productsHotDeal, setProductsHotDeal] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    
    const categoryOptions = [
        {title: 'đồ gốm', categoryImg: gomCategory},
        {title: 'đồ thổ cẩm', categoryImg: thocamCategory},
        {title: 'đồ đan lát', categoryImg: danlatCategory},
    ]
    return (
        <div className={`${cx('wrapper')}`}>
            <div className={`${cx('section-banner')}`}>
                <img src={homeBanner}/>
                <div className={`${cx('banner-title')}`}>
                    <h1>Nơi “ Lan tỏa nét đẹp Việt”</h1>
                </div>
            </div>
            <div className={`${cx('section-category')}`}>
                <div className={`${cx('category-title')}`}>
                    <h1>DANH MỤC SẢN PHẨM</h1>
                </div>
                <div className={`${cx('category')} w-100 d-flex flex-row`}>
                    {categoryOptions.map((option) => (
                    <div className={`${cx('category-option')} col-4`}>
                        <div>
                            <img src={option.categoryImg}/>
                            <p>{option.title}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className={`${cx('section-hot-deal')}`}>
                <div className={`${cx('category-title')}`}>
                    <h1>hot deal</h1>
                </div>
                <div className={`${cx('hot-deal')} w-100 d-flex flex-row justify-content-around`}>
                    {productsHotDeal?.map((product) => (<ProductCard product={product}/>))}
                </div>
            </div>
        </div>
    )
}

export default Home;