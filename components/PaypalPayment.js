"use client"
import { PayPalButtons } from "@paypal/react-paypal-js"; 
import { useAppDispatch } from '@/redux/store';
import { reset } from '@/redux/features/cart-slice'; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Success } from "./Modal/SuccessModal";


const PayPalPayment = ({totalCost}) => {
  const serverUrl = process.env.NEXT_PUBLIC_PAYPAL_API_URL; 
  const router = useRouter()
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const createOrder = (data) => { 
      return fetch(`${serverUrl}/my-server/create-paypal-order`, {
        method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            "name": "Test product",
            "cost": totalCost * 0.000042
          }
        }),
      })
      .then((response) => response.json())
      .then((order) => order.id) ;
  }

  const onApprove = (data) => {
      return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
        method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID
        })
      })
      .then((res) => res.json())
      .then((res) => {
        dispatch(reset());
        // router.push("/")
        setIsOpen(true)
        console.log(res); 
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  return (
    <>  
      <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
      />  
      <Success isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>  
  );
}
 
export default PayPalPayment;