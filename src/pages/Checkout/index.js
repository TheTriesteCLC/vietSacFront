import React, { useEffect, useState } from "react";
import { Provider } from "./CheckoutContext";
import Checkout from "./Checkout";
// import Overview from "./Overview"

import './index.module.css'
import { useAuth } from "../../provider";
import { checkoutCart, getUserInfo } from "../../api/site";
import { useNavigate } from "react-router-dom";

const checkoutInitialState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  city: "",
  district: "",
  ward: "",
  voucher: "",
  shippingOption: "",
  paymentMethod: ""
};

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <Checkout/>;
    // case 1:
    //   return <Overview/>;
    default:
      return null;
  }
};

const CheckoutPage = () => {
    const navigate = useNavigate();

    const {userID, cart} = useAuth();
    const [userInfo, setUserInfo] = useState({});

    const fetchData = async() => {
        try{
            const userInfoData = (await getUserInfo(userID)).data;
            setUserInfo(userInfoData);
        }catch(error) {
            navigate('/error');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function createOrderCheckout() {
        const sendOrderInfo = {
          'userId': userID,
          'shippingMethodId': checkout.shippingOption,
          'paymentMethodId': checkout.paymentMethod
        }
        try {
            const res = await checkoutCart();
            console.log(res);
        }catch(error) {
          navigate('/error');
        }
    }

    checkoutInitialState.email = userInfo.email;
    checkoutInitialState.firstName = userInfo.firstName;
    checkoutInitialState.lastName = userInfo.lastName;
    checkoutInitialState.address = userInfo.address !== 'unknown' ? userInfo.address : '';
    checkoutInitialState.phone = userInfo.phone !== 'unknown' ? userInfo.phone : '';

    const [checkout, setCheckout] = useState(checkoutInitialState);
    const [currentStep, setCurrentStep] = useState(0);

    const next = () => {
        // if (currentStep === 1) {
        //   setCurrentStep(0);

        //   setCheckout(checkoutInitialState);
        //   createOrderCheckout();
        //   navigate('/thankyou')
        //   return;
        // }
        // setCurrentStep(currentStep + 1);
        setCurrentStep(0);

        setCheckout(checkoutInitialState);
        createOrderCheckout();
        navigate('/thankyou')
        return;
    };

    const prev = () => setCurrentStep(currentStep - 1);
    return (
      <Provider value={{ checkout, cart, userInfo, setCheckout, next, prev}}>
        <main>{renderStep(currentStep)}</main>
      </Provider>
    )
}

export default CheckoutPage;