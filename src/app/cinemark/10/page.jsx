"use client";
import React from "react";
import tenth from "../../../../assets/cinemark/10.PNG";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { TfiCheckBox } from "react-icons/tfi";

const Cinemark10 = () => {
  return (
    <div className="min-h-screen bg-cineFormBg w-screen">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 ml-96">
          <FaArrowLeft className="w-6 h-6" />
          <h1 className="text-xl font-bold">CINEMARK Hoyts</h1>
        </div>
        <div className="w-6 h-6 rounded-full bg-zinc-700" />
      </header>
      <nav className="bg-zinc-800 text-white p-2">
        <h2 className="text-lg font-semibold ml-96">HOLA JAVIER</h2>
      </nav>
      <main className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-6 mx-20">
          <div>
            <div>
              <div className="text-center text-2xl font-black py-2 w-full border-2 border-black bg-neutral-300 mt-10 mb-3">
                <p className="py-2 px-32">
                  POR FAVOR VALIDÁ Y COMPLETÁ TUS DATOS
                </p>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <strong>Nombre*</strong>
                    <input
                      placeholder="NOMBRE"
                      defaultValue="Javier"
                      className="rounded-lg p-3"
                    />
                  </div>
                  <div className="flex flex-col">
                    <strong>Apellido*</strong>
                    <input
                      placeholder="APELLIDO"
                      defaultValue="Gutierrez"
                      className="rounded-lg p-3"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <strong>DNI (TITULAR DE LA CUENTA)*</strong>
                  <input
                    placeholder="DNI (TITULAR DE LA CUENTA)"
                    defaultValue="00000000"
                    className="w-1/2 rounded-lg p-3"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <select className="p-3">
                    <option>1984</option>
                  </select>
                  <select className="p-3">
                    <option>07</option>
                  </select>
                  <select className="p-3">
                    <option>20</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <TfiCheckBox id="promotions" />
                  <label htmlFor="promotions" className="text-sm text-zinc-500">
                    Acepto recibir promociones y novedades de CINE FAN
                  </label>
                </div>
                <div className="flex flex-col">
                  <div className="flex space-x-2">
                    <TfiCheckBox id="terms" />
                    <label htmlFor="terms" className="text-sm text-zinc-500">
                      He leído y acepto los Términos y Condiciones
                    </label>
                  </div>
                  <div className="flex space-x-1 text-sm">
                    <button className="text-sky-600 ">
                      Términos y condiciones
                    </button>
                    <p className="text-zinc-500 ">de CINE FAN</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-500">
                  *Todos los campos son requeridos.
                </p>
              </form>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="flex-1 bg-white border border-black py-2 font-bold">
              TARJETA
            </button>
            <button className="flex-1 bg-gray-100">MODO</button>
            <button className="flex-1 bg-gray-100 text-sm font-bold">
              DINERO EN CUENTA
            </button>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <strong>Nombre*</strong>
                <input
                  placeholder="NOMBRE"
                  defaultValue="Javier"
                  className="rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col">
                <strong>Apellido*</strong>
                <input
                  placeholder="APELLIDO"
                  defaultValue="Gutierrez"
                  className="rounded-lg p-3"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <strong>EMAIL</strong>
              <input
                placeholder="gutijh@gamil.com"
                className=" rounded-lg p-3"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <strong>Nombre DEL TITULAR</strong>
                  <input
                    placeholder="NOMBRE"
                    defaultValue="Javier"
                    className="rounded-lg p-3"
                  />
                </div>
                <div className="flex flex-col">
                  <strong>DNI DEL TITULAR</strong>
                  <input
                    placeholder="APELLIDO"
                    defaultValue="Gutierrez"
                    className="rounded-lg p-3"
                  />
                </div>
                <div className="flex flex-col">
                  <strong>NÚMERO DE TARJETA</strong>
                  <input
                    placeholder="0000 0000 0000 0000"
                    className="rounded-lg p-3"
                  />
                </div>
                <div className="flex flex-col">
                  <strong>CÓDIGO DE SEGURIDAD</strong>
                  <input placeholder="***" className="rounded-lg p-3" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <Image
            src={tenth}
            alt="Resumen de compra"
            width={1920}
            height={1080}
            className="w-3/4 h-3/4 object-cover flex justify-center rounded-lg"
          />
        </div>
      </main>
    </div>
  );
};

export default Cinemark10;
