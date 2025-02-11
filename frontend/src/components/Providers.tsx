"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store,persistor } from "../store/store";
import AuthSync from "./AuthSync";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
 
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
        <AuthSync />
        {children}
        </PersistGate>
        
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
