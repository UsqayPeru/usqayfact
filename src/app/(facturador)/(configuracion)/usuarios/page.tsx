"use client"
import React, { useState } from 'react';

const UsuariosPage = () => {
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editUserEmisorId, setEditUserEmisorId] = useState<string | null>(null);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isEmisorModalOpen, setEmisorModalOpen] = useState(false);

  const guardarUsuario = () => {
    // Implementar lógica para guardar usuario
  };

  const eliminarUsuario = (id:number) => {
    // Implementar lógica para eliminar usuario
  };

  const guardarUsuarioEmisor = () => {
    // Implementar lógica para guardar usuario emisor
  };

  const eliminarUsuarioEmisor = (id:number) => {
    // Implementar lógica para eliminar usuario emisor
  };

  const usuarios = [
    { id: 1, usuario: 'usuario1', contrasena: 'password1' },
    { id: 2, usuario: 'usuario2', contrasena: 'password2' },
  ];

  const usuariosEmisores = [
    {
      id: 1,
      usuario: 'usuario1',
      emisor: 'emisor1',
      clientId: 'clientId1',
      clientSecret: 'clientSecret1',
      username: 'username1',
      password: 'password1',
    },
    {
      id: 2,
      usuario: 'usuario2',
      emisor: 'emisor2',
      clientId: 'clientId2',
      clientSecret: 'clientSecret2',
      username: 'username2',
      password: 'password2',
    },
  ];

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg shadow-lg bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Usuarios</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Buscar usuario"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={() => setUserModalOpen(true)}
                  className="bg-[#FFC859] text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                >
                  Nuevo
                </button>
              </div>
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="min-w-full table-auto text-left text-sm text-gray-500">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
                  <tr>
                    <th className="px-4 py-3">Opciones</th>
                    <th className="px-4 py-3">Id</th>
                    <th className="px-4 py-3">Usuario</th>
                    <th className="px-4 py-3">Contraseña</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usuarios.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <select className="border rounded-lg px-2 py-1">
                          <option>Opciones</option>
                          <option onClick={() => setUserModalOpen(true)}>Editar</option>
                          <option onClick={() => eliminarUsuario(user.id)}>Eliminar</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">{user.id}</td>
                      <td className="px-4 py-2">{user.usuario}</td>
                      <td className="px-4 py-2">{user.contrasena}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Anterior</button>
              <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 ml-2">Siguiente</button>
            </div>
          </div>

          <div className="rounded-lg shadow-lg bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Usuarios Emisores</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Buscar usuario emisor"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={() => setEmisorModalOpen(true)}
                  className="bg-[#FFC859] text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                >
                  Nuevo
                </button>
              </div>
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="min-w-full table-auto text-left text-sm text-gray-500">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
                  <tr>
                    <th className="px-4 py-3">Opciones</th>
                    <th className="px-4 py-3">Id</th>
                    <th className="px-4 py-3">Usuario</th>
                    <th className="px-4 py-3">Emisor</th>
                    <th className="px-4 py-3">Client Id</th>
                    <th className="px-4 py-3">Client Secret</th>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">Password</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usuariosEmisores.map((emisor) => (
                    <tr key={emisor.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <select className="border rounded-lg px-2 py-1">
                          <option>Opciones</option>
                          <option onClick={() => setEmisorModalOpen(true)}>Editar</option>
                          <option onClick={() => eliminarUsuarioEmisor(emisor.id)}>Eliminar</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">{emisor.id}</td>
                      <td className="px-4 py-2">{emisor.usuario}</td>
                      <td className="px-4 py-2">{emisor.emisor}</td>
                      <td className="px-4 py-2">{emisor.clientId}</td>
                      <td className="px-4 py-2">{emisor.clientSecret}</td>
                      <td className="px-4 py-2">{emisor.username}</td>
                      <td className="px-4 py-2">{emisor.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Anterior</button>
              <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 ml-2">Siguiente</button>
            </div>
          </div>
        </div>
      </div>

      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h4 className="text-lg font-semibold mb-4">Editar Usuario</h4>
            <div className="mb-4">
              <label htmlFor="txt_usuario" className="block text-sm font-medium mb-2">Usuario</label>
              <input type="text" className="w-full p-3 border rounded" id="txt_usuario" placeholder="name@example.com" />
            </div>
            <div className="mb-4">
              <label htmlFor="txt_contrasenia" className="block text-sm font-medium mb-2">Contraseña</label>
              <input type="password" className="w-full p-3 border rounded" id="txt_contrasenia" placeholder="1234" />
            </div>
            <div className="flex justify-between">
              <button onClick={() => setUserModalOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Cerrar</button>
              <button onClick={guardarUsuario} className="bg-[#FFC859] text-white px-4 py-2 rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {isEmisorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
            <form id="frm_usuario_emisor" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h4 className="text-lg font-semibold mb-4 col-span-full">UNIR USUARIO CON EMISOR</h4>
              <div className="col-span-full mb-4 text-gray-800">Editando: <span className="font-medium text-xl" id="label_id_editar_usuario_emisor">{editUserEmisorId}</span></div>
              <div className="mb-3">
                <label htmlFor="select_usuario_usuarioEmisor" className="block text-sm font-medium mb-2">Elige un Usuario</label>
                <select className="w-full p-3 border rounded" id="select_usuario_usuarioEmisor">
                  {usuarios.map((user) => (
                    <option key={user.id} value={user.id}>{user.usuario}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="select_emisor_usuarioEmisor" className="block text-sm font-medium mb-2">Elige un Emisor</label>
                <select className="w-full p-3 border rounded" id="select_emisor_usuarioEmisor">
                  <option value="emisor1">Emisor 1</option>
                  <option value="emisor2">Emisor 2</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="txt_clientId_usuarioEmisor" className="block text-sm font-medium mb-2">Client Id</label>
                <input type="text" className="w-full p-3 border rounded" id="txt_clientId_usuarioEmisor" placeholder="9sfs1fsde-sdf1f951f-894fsdf-fsd54dds" />
              </div>
              <div className="mb-3">
                <label htmlFor="txt_clienteSecret_usuarioEmisor" className="block text-sm font-medium mb-2">Client Secret</label>
                <input type="text" className="w-full p-3 border rounded" id="txt_clienteSecret_usuarioEmisor" placeholder="9sfs1fsdesdf1f951f894fsdffsd54dds" />
              </div>
              <div className="mb-3">
                <label htmlFor="txt_username_usuarioEmisor" className="block text-sm font-medium mb-2">Username (RUC y Usuario)</label>
                <input type="text" className="w-full p-3 border rounded" id="txt_username_usuarioEmisor" placeholder="2015424141ABCEFHIJ" />
              </div>
              <div className="mb-3">
                <label htmlFor="txt_password_usuarioEmisor" className="block text-sm font-medium mb-2">Password</label>
                <input type="text" className="w-full p-3 border rounded" id="txt_password_usuarioEmisor" placeholder="ABACD1234" />
              </div>
              <div className="col-span-full flex justify-between">
                <button onClick={() => setEmisorModalOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancelar</button>
                <button onClick={guardarUsuarioEmisor} className="bg-[#FFC859] text-white px-4 py-2 rounded">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosPage;
