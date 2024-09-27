"use client";

import Image from "next/image";
import React from "react";
import registerImage from "../../../../public/assets/images/register-img.png";
import logo from "../../../../public/assets/icons/logo-icon.svg";
import RegisterForm from "@/components/forms/RegisterForm";

const Register = ({ params }) => {
  const { userId } = params;

  return (
    <div className="flex h-screen max-h-screen  ">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col">
          <div className="flex items-center mb-12">
            <Image
              src={logo}
              alt="logo"
              height={1000}
              width={1000}
              className=" h-20 w-fit "
            />
            <h1 className="text-5xl ml-2 font-extrabold text-green-500 font-serif">
              CareLink
            </h1>
          </div>

          <RegisterForm userId={userId} />
        </div>
      </section>
      <Image
        src={registerImage}
        alt="o"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
