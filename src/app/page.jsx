"use client";
import axios from "axios";
import Image from "next/image";
import logo from "../../assets/public/AIDI LOGO WEB.png";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { userState, setUserState } = useAppContext(); 
  const [error, setError] = useState(null); 
  const router = useRouter(); 

  useEffect(() => {
    // Asegúrate de que este código solo se ejecute en el cliente
    if (typeof window !== 'undefined') {
      const savedState = window.localStorage.getItem("authToken");
      if (savedState) {
        const userData = JSON.parse(savedState);
        setUserState(userData); // Almacena el estado del usuario
      }
    }
  }, [setUserState]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          dni: inputValue,
          cuil: inputValue,
          email: inputValue,
          phone: inputValue,
        }
      );

      if (response.data) {
        const userData = {
          id: response.data.user.id,
          dni: response.data.user.dni,
          cuil: response.data.user.cuil,
          email: response.data.user.email,
          phone: response.data.user.phone,
          role: response.data.user.role,
          token: response.data.token,
        };

        // Guarda el estado en localStorage
        localStorage.setItem("authToken", JSON.stringify(userData));

        // Actualiza el estado global
        setUserState(userData);
        setError(null);

        // Redirige según el rol del usuario
        if (response.data.user.role === "SUPER_ADMIN") {
          router.push("/users-dashboard");
        } else {
          router.push("/interactions");
        }
      } else {
        setError("No se encontró el usuario. Inténtalo de nuevo.");
        setUserState(null);
      }
    } catch (error) {
      setError("No se encontró el usuario. Inténtalo de nuevo.");
      setUserState(null);
    }
  };


  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-white">
      <div className="w-full max-w-sm p-6 bg-lightGray rounded-3xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 relative bottom-20">
            <Image src={logo} alt="User Icon" className="w-full h-full" />
          </div>
          <div className="relative flex flex-col items-center bottom-16">
            <p className="text-center text-sm text-black">
              INGRESA TU DNI, CUIL, MAIL O CELULAR
              <br />
              <span className="text-xs">
                (te llegará una confirmación a tu celu)
              </span>
            </p>
            <div className="w-full mt-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="545411544"
                className="w-full border border-darkBlue rounded-md p-2"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-3/4 mt-4 py-2 rounded-md border-2 border-darkBlue bg-lightBlue text-xl text-white"
            >
              <p className="flex justify-center">INGRESAR</p>
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <p className="mt-4 text-center text-sm text-black">
              O ESCANEA EL CÓDIGO QR
              <br />
              DESDE LA APLICACÓN AIDI
            </p>
            <div className="mt-10 justify-center items-center bg-red-300">
              QR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
