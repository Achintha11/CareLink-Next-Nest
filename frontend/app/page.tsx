"use client";

import Image from "next/image";
import logo from "../public/assets/icons/logo-icon.svg";
import onBoardImage from "../public/assets/images/onboarding-img.png";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";

export default function Home({ searchParams }) {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen  ">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto ">
        <div className="sub-container max-w-[496px]">
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
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
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
