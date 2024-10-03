"use client";
import { useAppContext } from "@/context";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function InteractionsDashboard() {
  const { userState } = useAppContext();
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const formatDateTable = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    // Función para obtener las transacciones solo cuando las compañías estén cargadas
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/transactions/",
          {
            headers: {
              Authorization: userState.token,
            },
          }
        );

        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (userState.token) {
      fetchTransactions();
    }
  }, [userState.token]);

  // Función para filtrar interacciones
  const filteredInteractions = transactions.filter((interaction) => {
    const originante =
      interaction.cuit_company_origin || interaction.cuil_user_origin || "";
    return originante.toLowerCase().includes(searchTerm.toLowerCase());
  });
  // console.log({ filteredInteractions });
  console.log({ transactions });

  return (
    <div className="overflow-x-auto w-full m-16">
      <p className="text-blue text-6xl font-bold mb-6">INTERACCIONES</p>
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
              #
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Originante
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Suboriginante
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Motivo
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Por dónde entró
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Tipo
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Respuesta
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-black text-left">
              Fecha
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {filteredInteractions.map((transaction, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap p-5 text-darkBlue">
                <Popover
                  placement="right"
                  isOpen={openPopoverIndex === index}
                  onOpenChange={(open) =>
                    setOpenPopoverIndex(open ? index : null)
                  }
                >
                  <PopoverTrigger>
                    <button className="underline">Ver detalle</button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="bg-gray-100 shadow-xl border border-darkBlue p-5 rounded-lg">
                      <p className="mb-5">
                        <strong className="capitalize">
                          {transaction.detail}
                        </strong>
                      </p>
                      <div className="space-y-2">
                        <div className="flex flex-row justify-between text-sm space-x-2">
                          <p>Originante: </p>
                          <p>
                            {transaction.cuit_company_origin
                              ? transaction.cuit_company_origin
                              : transaction.cuil_user_origin}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between text-sm space-x-2">
                          <p>Suboriginante: </p>
                          <p>
                            {transaction.cuil_operator_origin
                              ? transaction.cuil_operator_origin
                              : "-"}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between text-sm space-x-2">
                          <p>Por dónde entró: </p>
                          {(() => {
                            const customerData = transaction.data_customer
                              ? JSON.parse(transaction.data_customer)
                              : null;

                            if (customerData?.dni) {
                              return "DNI";
                            } else if (customerData?.cuil) {
                              return "CUIL";
                            } else if (customerData?.email) {
                              return "Email";
                            } else if (customerData?.phone) {
                              return "Teléfono";
                            } else {
                              return "No disponible";
                            }
                          })()}
                        </div>
                        <div className="flex flex-row justify-between text-sm space-x-2">
                          <p>Tipo: </p>
                          {transaction.interaction === "request" ? (
                            <p>Solicitud</p>
                          ) : (
                            <p>Notificación</p>
                          )}
                        </div>
                        <div className="flex flex-row justify-between text-sm space-x-2">
                          <p>Respuesta: </p>
                          {transaction.status === "approved" ? (
                            <p className="font-semibold text-green-500">
                              Aprobado
                            </p>
                          ) : transaction.status === "disapproved" ? (
                            <p className="font-semibold text-red-500">
                              Denegado
                            </p>
                          ) : transaction.status === "waiting_user" ? (
                            <p className="font-semibold text-yellow-400">
                              En espera
                            </p>
                          ) : transaction.status === "user_not_found" ? (
                            <p className="font-semibold text-gray-400">
                              Usuario no registrado
                            </p>
                          ) : (
                            <p className="font-semibold text-orange-400">
                              Sin respuesta / Error de red
                            </p>
                          )}
                        </div>
                        <div className="flex flex-row justify-between text-sm space-x-2">
                          <p>Presencial o Virtual: </p>
                          {transaction.onSite === "virtual" ? (
                            <p>Virtual</p>
                          ) : (
                            <p>Presencial</p>
                          )}
                        </div>
                        <div className="flex flex-row justify-between text-sm space-x-2">
                          <p>Fecha: </p>
                          <p>{formatDate(transaction.date)}</p>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
              <td className="whitespace-nowrap p-5 text-black">
                {transaction.cuit_company_origin
                  ? transaction.cuit_company_origin
                  : transaction.cuil_user_origin}
              </td>
              <td className="whitespace-nowrap p-5 text-black">
                {transaction.cuil_operator_origin
                  ? transaction.cuil_operator_origin
                  : "-"}
              </td>
              <td className="whitespace-nowrap p-5 text-black max-w-xs truncate capitalize">
                {transaction.detail}
              </td>
              <td className="whitespace-nowrap p-5 text-black">
                {(() => {
                  const customerData = transaction.data_customer
                    ? JSON.parse(transaction.data_customer)
                    : null;

                  if (customerData?.dni) {
                    return "DNI";
                  } else if (customerData?.cuil) {
                    return "CUIL";
                  } else if (customerData?.email) {
                    return "Email";
                  } else if (customerData?.phone) {
                    return "Teléfono";
                  } else {
                    return "No disponible";
                  }
                })()}
              </td>
              {transaction.interaction === "request" ? (
                <td className="whitespace-nowrap p-5 text-black">Solicitud</td>
              ) : (
                <td className="whitespace-nowrap p-5 text-black">
                  Notificación
                </td>
              )}
              <td className="whitespace-nowrap p-5 text-black">
                {transaction.status === "approved" ? (
                  <p className="bg-green-500 p-2 rounded-lg text-center">
                    Aprobado
                  </p>
                ) : transaction.status === "disapproved" ? (
                  <p className="bg-red-500 p-2 rounded-lg text-center">
                    Denegado
                  </p>
                ) : transaction.status === "waiting_user" ? (
                  <p className="bg-yellow-400 p-2 rounded-lg text-center">
                    En espera
                  </p>
                ) : transaction.status === "user_not_found" ? (
                  <p className="bg-gray-400 p-2 rounded-lg text-center">
                    Usuario no registrado
                  </p>
                ) : (
                  <p className="bg-orange-400 p-2 rounded-lg text-center">
                    Sin respuesta / Error de red
                  </p>
                )}
              </td>
              <td className="whitespace-nowrap p-5 text-black">
                {formatDateTable(transaction.date)}
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
}

export default InteractionsDashboard;
