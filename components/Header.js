import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/marche-logo.png'

export default function Header() {
    return (
        <>
            <style jsx>{`
                div.policyHero {
                    background-image: url('banner1.webp');
                }
                
                .policyHero {
                    width: 100%;
                    background-repeat: no-repeat;
                    height: 300px;
                    background-size: cover;
                    background-position: 50%;
                    text-shadow: 0 1px 2px rgba(0,0,0,.25);
                    background-color: rgba(103,99,99,.6313725490196078);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .policyHero h2 {
                    text-align: center;
                    color: #ff3;
                    background-color: rgba(0,26,110,.8);
                    font-size: 2.5rem;
                    padding: 8px 30px;
                    border-radius: 3px;
                }
                
                .logo {
                    border-bottom: 1px solid #eee!important;
                    text-align: center;
                    font-weight: 400;
                    padding: 10px 80px;
                    width: 100%;
                }
            `}</style>
            <div className="textCenter logo">
                <Link href="/">
                    <a>
                        <Image src={logo} width={170} height={45} />
                    </a>
                </Link>
            </div>
            <div className="policyHero">
                <h2>We are here to help!</h2>
            </div>
        </>
    );
}