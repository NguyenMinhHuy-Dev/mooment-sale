"use client"

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from '@/redux/store';
import { Provider } from "react-redux";
import React from "react"

let persistor = persistStore(store)

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>;
            <PersistGate persistor={persistor}>     
                {children}
          </PersistGate>
        </Provider>;
}