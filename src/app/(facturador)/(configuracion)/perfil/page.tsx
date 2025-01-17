"use client"
import React from "react";
import toast from "react-hot-toast";

export default function MiCuenta() {
  const [passwordOld, setPasswordOld] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const endpoint =  process.env.NEXT_PUBLIC_ENDPOINT_BACKEND
  
  const handleSubmit = async () => {
    // Validar datos antes de enviar
    if (!passwordOld || !password || password.length < 8) {
      toast.error("Por favor ingresa una contraseña válida.");
      return;
    }
  
    try {
      const response = await fetch(`${endpoint}/backend/api/cambiar_password.php?cambiar_contrasenia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: "usq@y",
          contrasenia_actual: passwordOld,
          nueva_contrasenia: password,
        }),
      });
  
      if (!response.ok) {
        const message = `Error ${response.status}: ${response.statusText}`;
        throw new Error(message);
      }
      console.log(response.text())
      const result = await response.json();
  
      if (result.success) {
        toast.success("La contraseña ha sido cambiada exitosamente.");
      } else {
        toast.error(result.message || "No se pudo cambiar la contraseña. Contactar con soporte.");
      }
    } catch (error:any) {
      toast.error(error.message || "Ocurrió un error inesperado. Inténtalo de nuevo.");
      console.log(error.message);
    }
  };
  
  const handlePasswordOldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordOld(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Header */}
   
      {/* Formulario */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-6 mt-5">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Mi Cuenta
        </h1>
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Usuario<span className="text-red-500">!</span>
            </label>
            <input
              type="email"
              id="email"
              defaultValue="jeasoncues@gmail.com"
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
            />
          </div>
            {/* Password */}
            <div className="flex space-x-4">
            <div className="w-1/2">
              <label
              htmlFor="passwordold"
              className="block text-sm font-medium text-gray-700"
              >
              Contraseña Antigua <span className="text-red-500">!</span>
              </label>
              <input
              type="password"
              id="passwordold"
              value={passwordOld}
              onChange={handlePasswordOldChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="w-1/2">
              <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
              >
              Contraseña Nueva<span className="text-red-500">!</span>
              </label>
              <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="w-1/2">
              <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
              >
              Confirmar Contraseña <span className="text-red-500">!</span>
              </label>
              <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            </div>    
          {/* Botón */}
       
        </form>

        <button
           onClick={()=>{handleSubmit()}}
            className="w-full bg-blue-500 text-white text-lg font-medium py-2 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            Actualizar Usuario
          </button>
      </div>
    </div>
  );
}
