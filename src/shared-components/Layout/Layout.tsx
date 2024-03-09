import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Header } from '../Header';
import Footer from '../Footer/Footer';
import PagePreloader from '../PagePreloader/PagePreloader';
import AllModals from '../AllModals/AllModals';
import './Layout.scss';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <Suspense fallback={<PagePreloader />}>
                <ReactLenis
                    options={{
                        duration: 0.7,
                        easing: (t) => Math.min(1, 1.001 - 2 ** (-11 * t)),
                        lerp: 0.1,
                        syncTouch: false,
                        syncTouchLerp: 1,
                    }}
                    root
                >
                    <Outlet />
                </ReactLenis>
            </Suspense>
            <AllModals />
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default Layout;
