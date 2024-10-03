"use client";
import { useAppContext } from "@/context";
import { Tooltip } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBan, FaUnlock } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";

const UserDashboard = () => {
  const { userState } = useAppContext();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = async (user) => {
    try {
      const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      const response = await axios.put(
        "http://localhost:3003/api/users/status",
        { dni: user.dni, statusUser: newStatus },
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.dni === user.dni ? { ...u, statusUser: newStatus } : u
        )
      );
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/users/", {
          headers: {
            Authorization: userState.token,
          },
        });

        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (userState.token) {
      // Verifica si el token está disponible
      fetchUsers();
    }
  }, [userState.token]);

  const handleDeleteUser = async (user) => {
    try {
      const response = await axios.delete(
        `http://localhost:3003/api/users/${user.id}`,
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== user.id)
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  // Función para filtrar usuarios
  const filteredUsers = users.filter((user) => {
    return (
      user.dni.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toString().includes(searchTerm) ||
      user.cuit.toString().includes(searchTerm)
    );
  });
  console.log(filteredUsers);

  return (
    <div className="overflow-x-auto w-full m-16">
      <p className="text-blue text-6xl font-bold mb-6">USUARIOS</p>
      <input
        type="text"
        placeholder="Busca..."
        className="text-lg p-2 mb-5 border-b border-blue flex justify-end"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="min-w-full divide-y-2 rounded-lg divide-darkBlue bg-white text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              DNI
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Email
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Teléfono
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              CUIL
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Empleador
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
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap p-5 text-black">{user.dni}</td>
              <td className="whitespace-nowrap p-5 text-black">{user.email}</td>
              <td className="whitespace-nowrap p-5 text-black">
                +{user.phone}
              </td>
              <td className="whitespace-nowrap p-5 text-black">{user.cuil}</td>
              {user.userCompanies?.length > 0 ? (
                <Tooltip content={user.userCompanies
                  .map((company) => company.company.companyName)
                  .join(", ")}
                  showArrow
                  size="sm"
                  className="bg-blue text-white rounded-xl px-2">
                  <td className="whitespace-nowrap px-5"><FaBuildingUser className="text-2xl text-blue" /></td>
                </Tooltip>
              ) : (
                <td className="whitespace-nowrap px-5"><FaBuildingUser className="text-2xl text-gray-400" /></td>
              )}
              <td className="whitespace-nowrap p-5 text-black">
                {user.status === 'ACTIVE' ? <p className="bg-green-500 p-2 rounded-lg text-center">ACTIVO</p> : <p className="bg-red-500 p-2 rounded-lg text-center">BANEADO</p>}
              </td>
              <td className="whitespace-nowrap p-5 text-black text-center space-x-4">
                {user.status === 'ACTIVE' ?
                  <Tooltip
                    content="Banear"
                    className="bg-red-500 text-white rounded-xl px-2"
                    showArrow
                  >
                    <button
                      onClick={() => handleStatusChange(user)}
                    >
                      <FaBan className="text-red-500 text-lg" />
                    </button>
                  </Tooltip>
                  :
                  <Tooltip
                    content="Desbanear"
                    className="bg-green-500 text-white rounded-xl px-2"
                    showArrow
                  >
                    <button
                      onClick={() => handleStatusChange(user)}
                    >
                      <FaUnlock className="text-green-500 text-lg" />
                    </button>
                  </Tooltip>
                }
                <Tooltip
                  content="Eliminar"
                  className="bg-red-500 text-white rounded-xl px-2"
                  showArrow
                >
                  <button onClick={() => handleDeleteUser(user)}>
                    <FaTrash className="text-red-500 text-lg" />
                  </button>
                </Tooltip>
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

export default UserDashboard;
