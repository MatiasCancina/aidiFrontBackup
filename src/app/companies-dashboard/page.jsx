"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import axios from "axios";
import { FaBan, FaTrash, FaUserPlus, FaUnlock, FaSearch } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";
import { CgDetailsMore } from "react-icons/cg";
import {
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import CreateCompany from "@/components/Companies/CreateCompany";
import UpdateCompany from "@/components/Companies/UpdateCompany";

const CompaniesDashboard = () => {
  const { userState } = useAppContext();
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cuilToAdd, setCuilToAdd] = useState("");
  const [userFound, setUserFound] = useState(null);
  const [isCreatePopoverOpen, setIsCreatePopoverOpen] = useState(false);
  const [isEditPopoverOpen, setIsEditPopoverOpen] = useState(false);
  const [operators, setOperators] = useState([]);
  const [isOpAddPopoverOpen, setIsOpAddPopoverOpen] = useState(false); // estado del popover para agregar empleados
  const [message, setMessage] = useState("");

  // Función para obtener empresas
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/`, {
        headers: { Authorization: userState.token },
      });
      setCompanies(response.data.companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers: { Authorization: userState.token },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Llamadas a las funciones para obtener empresas y usuarios
    if (userState.token) {
      fetchCompanies();
      fetchUsers();
    }
  }, [userState.token]);

  const handleAddOperator = async (company) => {
    if (!userFound) {
      console.error("No user found with the given email.");
      setMessage("Usuario no encontrado.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/add-to-company`,
        { cuil: userFound.cuil, companyId: company.id },
        {
          headers: { Authorization: userState.token },
        }
      );
      setIsOpAddPopoverOpen(false);
      setMessage("Usuario agregado correctamente.");
      console.log("User added successfully:", response.data);

      // Limpia el campo de búsqueda y el usuario encontrado
      setCuilToAdd("");
      setUserFound(null);
    } catch (error) {
      console.error("Error adding user to company:", error);
      setMessage("Error al agregar el usuario.");
    }
  };


  const handleSearchUser = () => {
    const foundUser = users.find((user) => user.cuil.toString() === cuilToAdd.toString());
    setUserFound(foundUser);
  };

  const handleGetOperators = async (company) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/operators/${company.id}`,
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );
      console.log(response.data.operators);
      setOperators(response.data.operators);
    } catch (error) {
      console.error("Error al traer la lista de empledos:", error);
    }
  };

  const handleBanCompany = async (company) => {
    try {
      const updatedStatus = company.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/status`,
        {
          cuit: company.cuit,
          statusCompany: updatedStatus,
        },
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );

      setCompanies((prevCompanies) =>
        prevCompanies.map((comp) =>
          comp.cuit === company.cuit ? { ...comp, status: updatedStatus } : comp
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado de la empresa:", error);
    }
  };

  const handleDeleteCompany = async (company) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${company.id}`,
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );

      setCompanies((prevCompanies) =>
        prevCompanies.filter((c) => c.id !== company.id)
      );
    } catch (error) {
      console.error("Error al eliminar la empresa:", error);
    }
  }

  const filteredCompanies = companies.filter((company) => {
    return (
      company.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.companyCuil.toString().includes(searchTerm) ||
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.cuit.toString().includes(searchTerm) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.phone.toString().includes(searchTerm)
    );
  });

  return (
    <div className="overflow-x-auto w-full m-16">
      <p className="text-blue text-6xl font-bold mb-6">EMPRESAS</p>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Busca..."
          className="text-lg p-2 mb-5 border-b border-blue flex justify-end"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CreateCompany
          userState={userState}
          setCompanies={setCompanies}
          isCreatePopoverOpen={isCreatePopoverOpen}
          setIsCreatePopoverOpen={setIsCreatePopoverOpen}
        />
      </div>
      <table className="min-w-full divide-y-2 rounded-lg divide-darkBlue bg-white text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Nombre
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Razón Social
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              CUIT
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Estado
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-center">
              #
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredCompanies.map((company, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap p-5 text-black">
                {company.companyName}
              </td>
              <td className="whitespace-nowrap p-5 text-black">
                {company.razonSocial}
              </td>
              <td className="whitespace-nowrap p-5 text-black">
                {company.cuit}
              </td>
              <td className="whitespace-nowrap p-5 text-black">
                {company.status === "ACTIVE" ? (
                  <p className="bg-green-500 p-2 rounded-lg text-center">
                    ACTIVO
                  </p>
                ) : (
                  <p className="bg-red-500 p-2 rounded-lg text-center">
                    BANEADO
                  </p>
                )}
              </td>
              <td className="whitespace-nowrap px-5 py-3 text-black text-center">
                <div className="flex justify-center space-x-2">
                  {company.status === "ACTIVE" ? (
                    <Tooltip
                      content="Banear"
                      className="bg-red-500 text-white rounded-xl px-2"
                      showArrow
                    >
                      <button onClick={() => handleBanCompany(company)}>
                        <FaBan className="text-red-500 text-lg" />
                      </button>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      content="Desbanear"
                      className="bg-green-500 text-white rounded-xl px-2"
                      showArrow
                    >
                      <button onClick={() => handleBanCompany(company)}>
                        <FaUnlock className="text-green-500 text-lg" />
                      </button>
                    </Tooltip>
                  )}
                  <Tooltip
                    content="Eliminar"
                    className="bg-red-500 text-white rounded-xl px-2"
                    showArrow
                  >
                    <button>
                      <FaTrash className="text-red-500 text-lg" onClick={() => handleDeleteCompany(company)} />
                    </button>
                  </Tooltip>

                  <Popover open={isOpAddPopoverOpen} placement="left">
                    <PopoverTrigger>
                      <button onClick={() => setIsOpAddPopoverOpen(true)}>
                        <FaUserPlus className="text-blue text-xl" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="bg-blue border-2 shadow-lg border-lightBlue p-3 rounded-lg my-2 space-y-2 flex flex-col items-center">
                        <strong className="text-white text-center">Agregar Empleado</strong>
                        <div className="flex flex-row space-x-2">
                          <input
                            type="text"
                            placeholder="Cuil del empleado"
                            value={cuilToAdd}
                            onChange={(e) => setCuilToAdd(e.target.value)}
                            className="px-2 py-1 rounded-lg"
                          />
                          <button onClick={handleSearchUser}>
                            <FaSearch className="text-white text-lg" />
                          </button>
                        </div>

                        {userFound ? (
                          <div className="space-y-1">
                            <p className="text-white text-center">Usuario encontrado</p>
                            <button
                              onClick={() => handleAddOperator(company)}
                              className="bg-lightBlue shadow-xl p-2 px-2 rounded-lg flex justify-center w-full"
                            >
                              <p className="text-white">Agregar a la empresa</p>
                            </button>
                          </div>
                        ) : (
                          <p className="text-white">Usuario no encontrado.</p>
                        )}

                        {/* Aquí se muestra el mensaje de éxito o error */}
                        {message && <p className="text-green-500 mt-2">{message}</p>}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover placement="left">
                    <PopoverTrigger>
                      <button onClick={() => handleGetOperators(company)}>
                        <FaUsersRectangle className="text-blue text-2xl" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="bg-lightGray rounded-lg p-3 shadow-lg">
                        <strong className="text-xl text-darkBlue">
                          Empleados
                        </strong>
                        <table className="min-w-full divide-y-2 overflow-y-scroll divide-darkBlue  text-sm">
                          <thead>
                            <tr>
                              <th className="whitespace-nowrap px-4 py-3 text-black text-left">
                                CUIL
                              </th>

                              <th className="whitespace-nowrap px-4 py-3 text-black text-left">
                                Email
                              </th>

                              <th className="whitespace-nowrap px-4 py-3 text-black text-left">
                                Teléfono
                              </th>

                              <th className="whitespace-nowrap px-4 py-3 text-black text-left">
                                DNI
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {operators.map((operator) => (
                              <tr key={operator.id}>
                                <td className="whitespace-nowrap p-5 text-black">
                                  {operator.cuil}
                                </td>
                                <td className="whitespace-nowrap p-5 text-black">
                                  {operator.email}
                                </td>
                                <td className="whitespace-nowrap p-5 text-black">
                                  {operator.phone}
                                </td>
                                <td className="whitespace-nowrap p-5 text-black">
                                  {operator.dni}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Tooltip
                    content="Editar"
                    className="text-white bg-lightBlue rounded-xl px-2"
                    showArrow
                  >
                    <div>
                      <UpdateCompany
                        userState={userState}
                        setCompanies={setCompanies}
                        isEditPopoverOpen={isEditPopoverOpen}
                        setIsEditPopoverOpen={setIsEditPopoverOpen}
                        company={company}
                      />
                    </div>
                  </Tooltip>
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <button>
                        <CgDetailsMore className="text-blue text-2xl" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="bg-gray-100 shadow-xl border border-darkBlue p-5 rounded-lg">
                        <p className="mb-5">
                          <strong>{company.companyName}</strong>
                        </p>
                        <div className="space-y-2 flex flex-col">
                          <div className="flex flex-row justify-between text-sm space-x-2">
                            <p>Razón Social: </p>
                            <p>{company.razonSocial}</p>
                          </div>

                          <div className="flex flex-row justify-between text-sm space-x-2">
                            <p>CUIT: </p>
                            <p>{company.cuit}</p>
                          </div>
                          <div className="flex flex-row justify-between text-sm space-x-2">
                            <p>Email: </p>
                            <p>{company.email}</p>
                          </div>

                          <div className="flex flex-row justify-between text-sm space-x-2">
                            <p>Teléfono: </p>
                            <p>+{company.phone}</p>
                          </div>

                          <div className="flex flex-row justify-between text-sm space-x-2">
                            <p>Dirección: </p>
                            <p>{company.address}</p>
                          </div>

                          <div className="flex flex-row justify-between text-sm space-x-2">
                            <p>CUIL: </p>
                            <p>{company.companyCuil}</p>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-yellow-300 px-32 py-2 my-2 rounded-lg text-black text-sm font-semibold">
        Descargar en PDF/XLS
      </button>
    </div>
  );
};

export default CompaniesDashboard;
