"use client"

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from '@/redux/store';
import { Provider } from "react-redux";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

let persistor = persistStore(store); 

const initialOptions: any = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY,
    intent: process.env.NEXT_PUBLIC_PAYPAL_INTENT, 
  };

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>
            <PersistGate persistor={persistor}>   
                <PayPalScriptProvider options={initialOptions}>
                    {children}
                </PayPalScriptProvider>  
            </PersistGate>
          </Provider>
}