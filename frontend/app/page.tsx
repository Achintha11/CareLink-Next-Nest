"use client";

import Image from "next/image";
import logo from "../public/assets/icons/logo-icon.svg";
import onBoardImage from "../public/assets/images/onboarding-img.png";
import PatientForm from "@/components/forms/PatientForm";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen  ">
      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container max-w-[450px]">
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

          <PatientForm />
        </div>
      </section>
      <Image
        src={onBoardImage}
        alt="o"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
