"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context";

const ValidateIdentity = () => {
  const { userState } = useAppContext();
  const [identifierValue, setIdentifierValue] = useState("");
  const [interaction, setInteraction] = useState("");
  const [onSite, setOnSite] = useState("");
  const [detail, setDetail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userCompanies, setUserCompanies] = useState([]);

  const isOperator = userState?.role === "OPERATOR";

  // Hacer la petición para obtener las empresas del operador
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/companies/operator/${userState?.id}`,
          {
            headers: {
              Authorization: userState.token,
            },
          }
        );
        console.log(response.data);
        setUserCompanies(response.data.companiesByOperator); // Guardar las empresas en el estado
      } catch (error) {
        console.error("Error al obtener las empresas", error);
      }
    };

    if (isOperator) {
      fetchCompanies();
    }
  }, [isOperator, userState]);

  const handleIdentifierValueChange = (e) => {
    setIdentifierValue(e.target.value);
  };

  const handleInteractionChange = (e) => {
    setInteraction(e.target.value);
  };

  const handleOnSiteChange = (e) => {
    setOnSite(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const dataCustomer = {};

      // Verificar cuál propiedad se ha completado y asignar el valor correspondiente
      if (identifierValue) {
        // Asignar el valor ingresado a la propiedad correspondiente
        // Actualizar la lógica para el DNI
        if (/^\d{7,8}$/i.test(identifierValue)) {
          dataCustomer.dni = identifierValue; // Asumir que es DNI si tiene entre 7 y 8 dígitos
        } else if (/^\d{11}$/i.test(identifierValue)) {
          dataCustomer.cuil = identifierValue; // Asumir que es CUIL si es un número de 11 dígitos
        } else if (/^\d{10,15}$/i.test(identifierValue)) {
          dataCustomer.phone = identifierValue; // Asumir que es un teléfono si tiene entre 10 y 15 dígitos
        } else if (/^\S+@\S+\.\S+$/i.test(identifierValue)) {
          dataCustomer.email = identifierValue; // Asumir que es un email si sigue el formato correcto
        }
      }

      const requestData = {
        interaction,
        data_customer: dataCustomer,
        onSite,
        detail,
      };

      // Solo agregar name_company_origin si el usuario es operador y ha seleccionado una empresa
      if (isOperator && company) {
        requestData.name_company_origin = company;
      }
      console.log(requestData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
        requestData,
        {
          headers: {
            Authorization: userState.token,
          },
        }
      );

      setSuccess("Datos enviados exitosamente.");
      setError(null);
    } catch (error) {
      setError("Hubo un error al enviar los datos.");
      setSuccess(null);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen min-h-screen">
      <div className="flex flex-col items-center">
        <div className="space-y-5">
          {/* Input para ingresar el identificador */}
          <div className="w-full space-y-1">
            <p>Ingresa tu DNI, CUIL, Teléfono o Email</p>
            <input
              type="text"
              value={identifierValue}
              onChange={handleIdentifierValueChange}
              placeholder="4602141"
              className="w-full bg-lightGray rounded-md p-2"
            />
          </div>

          {/* Select para OnSite (virtual o presencial) */}
          <div className="w-full mt-4 space-y-1">
            <p>Tipo</p>
            <select
              value={onSite}
              onChange={handleOnSiteChange}
              className="w-full bg-lightGray rounded-md p-2"
            >
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="virtual">Virtual</option>
              <option value="in_person">Presencial</option>
            </select>
          </div>

          {/* Select para Interaction (notificación o solicitud) */}
          <div className="w-full mt-4 space-y-1">
            <p>Por donde se envía</p>
            <select
              value={interaction}
              onChange={handleInteractionChange}
              className="w-full bg-lightGray rounded-md p-2"
            >
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="notification">Notificación</option>
              <option value="request">Solicitud</option>
            </select>
          </div>

          {/* Select para empresa si el usuario es operador */}
          {isOperator && (
            <div className="w-full mt-4 space-y-1">
              <p>Selecciona una empresa</p>
              <select
                value={company}
                onChange={handleCompanyChange}
                className="w-full bg-lightGray rounded-md p-2"
              >
                <option value="" disabled>
                  Selecciona una empresa
                </option>
                {userCompanies.map((userCompany) => (
                  <option key={userCompany} value={userCompany}>
                    {userCompany}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="w-full mt-4 space-y-1">
            <p>Descripción</p>
            <textarea
              value={detail}
              placeholder="Escribe una descripción"
              onChange={handleDetailChange}
              className="w-96 h-40 bg-lightGray rounded-md p-2"
            ></textarea>
          </div>

          {/* Botón de enviar */}
          <button
            onClick={handleSubmit}
            className="w-full mt-4 py-2 rounded-md border-2 border-darkBlue bg-lightBlue text-xl text-white"
          >
            Enviar
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default ValidateIdentity;
