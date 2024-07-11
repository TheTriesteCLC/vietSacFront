import classNames from 'classnames/bind';
import styles from './index.module.css';

import ProductCard from '../../component/ProductCard';
import iconClose from '../../assets/icon/closeRed.svg'

import homeBanner from '../../assets/images/homeBanner.png'

import gomCategory from '../../assets/images/category/gomCategory.png'
import thocamCategory from '../../assets/images/category/thocamCategory.png'
import danlatCategory from '../../assets/images/category/danlatCategory.png'

import gallery1 from '../../assets/images/gallery/gallery1';
import gallery2 from '../../assets/images/gallery/gallery2';
import gallery3 from '../../assets/images/gallery/gallery3';
import gallery4 from '../../assets/images/gallery/gallery4';
import gallery5 from '../../assets/images/gallery/gallery5';
import gallery6 from '../../assets/images/gallery/gallery6';
import gallery7 from '../../assets/images/gallery/gallery7';
import gallery8 from '../../assets/images/gallery/gallery8';
import gallery9 from '../../assets/images/gallery/gallery9';
import gallery10 from '../../assets/images/gallery/gallery10';
import gallery11 from '../../assets/images/gallery/gallery11';
import gallery12 from '../../assets/images/gallery/gallery12';
import gallery13 from '../../assets/images/gallery/gallery13';

import danDo from '../../assets/images/galleryContent/danDo.png'
import { useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import GalleryModal from '../../component/GalleryModal';
import { getHighestDiscountAPI } from '../../api/shop';
import { getBlogsAllAPI } from '../../api/shop';
import { redirect, useNavigate } from 'react-router-dom';


const cx = classNames.bind(styles);

const Gallery = ({ gallery, blog }) => {
    const maskImg = new Image();
    maskImg.src = gallery.mask;

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
 
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    return (
        <>
        <div className={`${cx('gallery-img-wrapper')} bg-image position-absolute`} style={gallery.location} onClick={handleOpenModal}>
            <img src={gallery.galleryImg} style={gallery.mask} />
            <div className="mask" style={gallery.mask}></div>
        </div>
        <Dialog  
        open={openModal}
        onClose={handleCloseModal}
        maxWidth={'lg'}
        >
            <div className={`${cx('section-modal')} position-relative`}>
                <img src={iconClose} className={`${cx('close-modal-btn')} position-absolute`} onClick={handleCloseModal}/>
                <GalleryModal title={blog.title} imgParagraph={blog.pictureLink} paragraphs={[blog.description]}/>
            </div>
            
        </Dialog >
        </>
    );
}

const galleries = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery12,
    gallery13,
];

function Home() {
    const navigate = useNavigate();
    let [blogs, setBlogs] = useState([]);

    const [productsHotDeal, setProductsHotDeal] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async() => {
        try {
            const productHotDeal = (await getHighestDiscountAPI()).data[0];
            setProductsHotDeal([productHotDeal, productHotDeal, productHotDeal]);
            const blogs = (await getBlogsAllAPI()).data;
            const galleriesAndBlogs = []
            
            for(let i = 0; i < blogs.length; ++i) {
                const newBlog = {
                    pictureLink: blogs.at(i).pictureLink,
                    title: blogs.at(i).description.split('\n')[0],
                    description: blogs.at(i).description
                }
                galleriesAndBlogs.push({
                    gallery: galleries.at(i),
                    blog:  newBlog
                })
            }
            setBlogs(galleriesAndBlogs);
        }
        catch {
            navigate('/error');
        }
    }
    
    const categoryOptions = [
        {title: 'đồ gốm', categoryImg: gomCategory, pathTo: '/shop/do-gom'},
        {title: 'đồ thổ cẩm', categoryImg: thocamCategory, pathTo: '/shop/do-tho-cam'},
        {title: 'đồ đan lát', categoryImg: danlatCategory, pathTo: '/shop/do-dan-lat'},
    ]

    const [openModal, setOpenModal] = useState(false);
 
    const handleCloseModal = () => {
        setOpenModal(false);
    };
 
    const handleOpenModal = () => {
        setOpenModal(true);
    };

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
                    {categoryOptions.map((option, index) => (
                        <div className={`${cx('category-option')} col-4`} key={index}>
                            <div>
                                <a href={option.pathTo}>
                                    <img src={option.categoryImg}/>
                                </a>
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
                    {productsHotDeal?.map((product, index) => (<ProductCard product={product} key={index}/>))}
                </div>
            </div>
            <div className={`${cx('section-gallery-wrapper')}`} id='gallery'>
                <div className={`${cx('section-gallery')}`}>
                    <h1>gallery</h1>
                    <div className='position-relative'>
                        {blogs.map((blog, index) => {
                            return (
                                <Gallery gallery={blog.gallery} blog={blog.blog} handleOpenModal={handleOpenModal} key={index}></Gallery>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;