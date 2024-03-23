import React from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import Toaster from "@/shared/ui/Toaster";

const Auth = () => {
    const [activeForm, setActiveForm] = React.useState("signin");

    const forms = {
        signin: <SigninForm setActiveForm={setActiveForm} />,
        signup: <SignupForm setActiveForm={setActiveForm} />,
    };

    return (
        <main>
            <section className='flex items-center w-full box-border my-0 mx-auto h-screen'>
                <Toaster />
                {forms[activeForm as keyof typeof forms]}
                <div className='flex-1 bg-yellow-100 self-stretch'></div>
            </section>
        </main>
    );
};

export default Auth;