import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import 'antd/dist/antd.css';

export default function MyApp({ Component, pageProps }) {
    // Conditional layout switching based on component name
    /*if (Component.name == "index" || Component.name == "PrivacyPolicy" || Component.name == "PostingPolicy" || Component.name == "CookiePolicy") {
        return (
            <>
                <Header />
                <div className={styles.policyPage}>
                    <PolicyMenu />
                    <Component {...pageProps} />
                </div>

                <Footer />
            </>
        );
    }*/

    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}