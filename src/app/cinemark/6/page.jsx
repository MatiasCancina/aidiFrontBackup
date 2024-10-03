import Image from "next/image";
import Link from "next/link";
import React from "react";
import sixth from "../../../../assets/cinemark/6.PNG";
import logo from "../../../../assets/public/AIDI LOGO WEB.png";

const Cinemark6 = () => {
  return (
    <div className="w-screen flex flex-col min-h-screen bg-black text-white">
      <header className="bg-black p-4">
        <h1 className="text-2xl font-bold text-left ml-96">CINEMARK Hoyts</h1>
      </header>
      <nav className="bg-zinc-800 p-2">
        <h2 className="text-xl font-bold text-left ml-96">LOGIN</h2>
      </nav>
      <main className="flex-grow flex w-screen">
        <div className="w-1/2 flex-col flex justify-center items-center p-6 bg-lightGray shadow-md">
        <div className="h-36">
            <Image src={logo} alt="User Icon" className="w-full h-full" />
          </div>
          <div className="w-full space-y-6 flex flex-col items-center mt-10">
            <h3 className="text-xl font-semibold text-black text-center">
              INGRESA TU DNI, CUIT, MAIL O CELULAR
            </h3>
            <span className="text-md text-black text-center">
              (te llegará una confirmación a tu celu)
            </span>
            <input
              type="text"
              placeholder="46024141"
              className="w-1/4 border border-darkBlue rounded-md p-2"
            />
            <Link href="/cinemark/7"  className="w-1/4 mt-4 py-2 rounded-md border-2 border-darkBlue bg-lightBlue text-xl text-white">
              <p className="flex justify-center">INGRESAR</p>
            </Link>
          </div>
        </div>
        <div className="w-1/2 bg-black p-8 flex items-center justify-center">
          <div className="block h-full">
            <Image
              src={sixth}
              alt="Cinemark Image"
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cinemark6;
