import {Menu} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import styles from "../styles/Policy.module.css";
import {PolicyList} from "../components/PolicyList";
import Router, { useRouter } from "next/router";

const {SubMenu} = Menu

function parseUrlToString(url) {
    return url.replace(/-/g, " ");
};

export default function Policy() {
    const [policyHtml, setPolicyHtml] = useState(null)
    const [defaultKey, setDefaultKey] = useState(PolicyList.TERMS_OF_USE)
    const location = useRouter()
    const [afterLoad, setAfterLoad] = useState(true)

    useEffect(() => {
        componentSwitchByKey();
    }, []);

    useEffect(() => {
        const url = location.asPath.split("/").pop();
        const string = parseUrlToString(url);
        if (string && string == "Policy" && localStorage.getItem("policyPageFirstTimeLoadToken")) {
	    if (afterLoad){
		setDefaultKey(PolicyList.PRIVACY_POLICY);    
	        componentSwitchByKey(PolicyList.PRIVACY_POLICY)
		setAfterLoad(false)
            } else {
	        setDefaultKey(string);
            	componentSwitchByKey(string)
	    }

        }
        else {
            localStorage.setItem("policyPageFirstTimeLoadToken", "62b41ea74ebe726b269e16ef630ae690")
            setDefaultKey(PolicyList.TERMS_OF_USE);
            componentSwitchByKey(PolicyList.TERMS_OF_USE);
        }
    }, [location]);

    const componentSwitchByKey = (key) => {
        if (key === PolicyList.TERMS_OF_USE) {
            console.log("key: " + key)
            axios.get("https://test-web-link.themarche.ca/api/PoliciesManagement/TermsOfUse")
                .then((res) => {
                   // console.log("responseData: " + res.data)
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