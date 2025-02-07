"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import AuthSync from "./AuthSync";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AuthSync />
        {children}
      </Provider>
    </SessionProvider>
  );
};

export default Providers;