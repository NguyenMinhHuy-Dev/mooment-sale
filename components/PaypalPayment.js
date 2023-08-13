"use client"
import { PayPalButtons } from "@paypal/react-paypal-js"; 
import { useAppDispatch } from '@/redux/store';
import { reset } from '@/redux/features/cart-slice'; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Success } from "./Modal/SuccessModal";


const PayPalPayment = ({object}) => {
  const serverUrl = process.env.NEXT_PUBLIC_PAYPAL_API_URL; 
  const router = useRouter()
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false); 

  const finalCheckOut = async () => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/orders', {
        cache: 'no-cache',
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
      })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        dispatch(reset());
        setIsOpen(true); 
    })
    .catch((err) => {
        console.log(err);
    })
  }

  const createOrder = (data) => { 
    console.log(object)
      return fetch(`${serverUrl}/my-server/create-paypal-order`, {
        method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            "name": "Test product",
            "cost": object.totalCost * 0.000042
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
        finalCheckOut();
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