import Header from '../components/Header';
import Footer from '../components/Footer';

import classNames from 'classnames/bind';
import styles from './FixedHeaderLayout.module.css';


const cx = classNames.bind(styles);

function FixedHeaderLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={`${cx('header-wrapper')}`}>
                <Header isTransparent={false}/>
            </div>
            <div className={cx('container')}>
                {children}
            </div>
        </div>
    );
}

export default FixedHeaderLayout;
