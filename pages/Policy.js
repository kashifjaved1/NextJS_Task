import {Menu} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import styles from "../styles/Policy.module.css";
import {PolicyList} from "../components/PolicyList";

const {SubMenu} = Menu

export default function Policy(props) {
    console.log("received props to main function are: " + props)
    const [policyHtml, setPolicyHtml] = useState(null)
    const [defaultKey, setDefaultKey] = useState(PolicyList.TERMS_OF_USE)

    useEffect(() => {
        componentSwitchByKey();
    }, []);

    useEffect(() => {
        if (localStorage.getItem("policyPageFirstTimeLoadToken")) {
            localStorage.setItem("policyPageFirstTimeLoadToken", "62b41ea74ebe726b269e16ef630ae690")
            componentSwitchByKey(PolicyList.POSTING_POLICY);

        }
        else {
            componentSwitchByKey(PolicyList.TERMS_OF_USE);
        }
    });

    const componentSwitchByKey = (key) => {
        if (key === PolicyList.TERMS_OF_USE) {
            console.log("key: " + key)
            axios.get("https://test-web-link.themarche.ca/api/PoliciesManagement/TermsOfUse")
                .then((res) => {
                    console.log("responseData: " + res.data)
                    setPolicyHtml(res.data)
                })
        } else if (key === PolicyList.PRIVACY_POLICY) {
            axios.get("https://test-web-link.themarche.ca/api/PoliciesManagement/PrivacyPolicy")
                .then((res) => {
                    setPolicyHtml(res.data)
                })
        } else if (key === PolicyList.POSTING_POLICY) {
            axios.get("https://test-web-link.themarche.ca/api/PoliciesManagement/PostingPolicy")
                .then((res) => {
                    setPolicyHtml(res.data)
                })
        } else if (key === PolicyList.COOKIE_POLICY) {
            axios.get("https://test-web-link.themarche.ca/api/PoliciesManagement/CookiePolicy")
                .then((res) => {
                    setPolicyHtml(res.data)
                })
        }
    }

    const handleClick = e => {
        console.log('click ', e);
    };

    return (
        <div className="policyPageCtn">
            {!defaultKey ? null : (
                <div className={styles.policyPage}>
                    <Menu
                        onClick={handleClick}
                        style={{width: 256}}
                        selectedKeys={[defaultKey]}
                        defaultOpenKeys={["sub1"]}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title="General Policy">
                            {Object.keys(PolicyList).map((policy_value) => {
                                return <Menu.Item key={PolicyList[policy_value]}
                                    onClick={(elem) => {
                                        console.log("clicked key: " + elem.key)
                                        componentSwitchByKey(elem.key)
                                        setDefaultKey(elem.key)
                                    }}
                                >{PolicyList[policy_value]}</Menu.Item>;
                            })}
                        </SubMenu>
                    </Menu>
                    <div className={styles.policyDetail}>
                        {policyHtml ? (
                            <div dangerouslySetInnerHTML={{__html: policyHtml}}/>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    )
}