import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

function UpdateCompany({
  userState,
  setCompanies,
  isEditPopoverOpen,
  setIsEditPopoverOpen,
  company,
}) {
  const [formData, setFormData] = useState({
    cuit: "",
    razonSocial: "",
    address: "",
    email: "",
    companyCuil: "",
    companyName: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${company.id}`,
        formData,
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );

      // Actualizar la lista de empresas después de editar la empresa
      const updatedCompanies = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/`,
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );
      setCompanies(updatedCompanies.data.companies);
      setIsEditPopoverOpen(false);
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  return (
    <Popover
      placement="left-start"
      isOpen={isEditPopoverOpen}
      onOpenChange={(open) => setIsEditPopoverOpen(open)}
    >
      <PopoverTrigger>
        <button onClick={() => setIsEditPopoverOpen(true)}>
          <FaRegEdit className="text-blue text-xl" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full p-8 bg-blue rounded-lg shadow-lg">
          <h3 className="flex justify-center text-3xl text-white font-bold mb-4">
            Editar Empresa
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <p className="text-white">CUIT:</p>
              <input
                type="number"
                placeholder="Ingrese su CUIT"
                name="cuit"
                value={formData.cuit}
                onChange={handleChange}
                className="bg-lightGray px-3 py-1 w-full text-black rounded-md"
              />
            </div>
            <div className="space-y-1">
              <p className="text-white">Razón Social:</p>
              <input
                type="text"
                placeholder="Ingrese la Razón Social"
                name="razonSocial"
                value={formData.razonSocial}
                onChange={handleChange}
                className="bg-lightGray px-3 py-1 w-full text-black rounded-md"
              />
            </div>
            <div className="space-y-1">
              <p className="text-white">Dirección:</p>
              <input
                type="text"
                placeholder="Ingrese la Dirección"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-lightGray px-3 py-1 w-full text-black rounded-md"
              />
            </div>
            <div className="space-y-1">
              <p className="text-white">Email:</p>
              <input
                type="text"
                placeholder="Ingrese Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-lightGray px-3 py-1 w-full text-black rounded-md"
              />
            </div>
            <div className="space-y-1">
              <p className="text-white">CUIL:</p>
              <input
                type="number"
                placeholder="Ingrese su CUIL"
                name="companyCuil"
                value={formData.companyCuil}
                onChange={handleChange}
                className="bg-lightGray px-3 py-1 w-full text-black rounded-md"
              />
            </div>
            <div className="space-y-1">
              <p className="text-white">Nombre:</p>
              <input
                type="text"
                placeholder="Ingrese el Nombre"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="bg-lightGray px-3 py-1 w-full text-black rounded-md"
              />
            </div>
            <div className="space-y-1">
              <p className="text-white">Teléfono:</p>
              <input
                type="number"
                placeholder="Ingrese su Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-lightGray px-3 py-1 w-full text-black rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-lightBlue p-3 rounded-lg flex justify-center w-full"
            >
              <p className="text-white">Enviar</p>
            </button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateCompany;
