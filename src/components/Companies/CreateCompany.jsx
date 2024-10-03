import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { BsBuildingAdd } from "react-icons/bs";
import axios from "axios";

const CreateCompany = ({
  userState,
  setCompanies,
  isCreatePopoverOpen,
  setIsCreatePopoverOpen,
}) => {
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/register`,
        formData,
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );
      setIsCreatePopoverOpen(false);

      // Actualiza la lista de empresas después de agregar una nueva
      const updatedCompanies = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/`,
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );
      setCompanies(updatedCompanies.data.companies);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <Popover
      placement="left-start"
      isOpen={isCreatePopoverOpen}
      onOpenChange={(open) => setIsCreatePopoverOpen(open)}
    >
      <PopoverTrigger>
        <button className="bg-blue p-3 rounded-lg my-2 space-x-2 flex flex-row items-center">
          <BsBuildingAdd className="text-3xl text-white" />
          <p className="text-white">Agregar empresa</p>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full p-8 bg-blue rounded-lg shadow-lg">
          <h3 className="flex justify-center text-3xl text-white font-bold mb-4">
            Formulario de Empresa
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
};

export default CreateCompany;
