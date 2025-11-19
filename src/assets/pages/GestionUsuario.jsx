// src/pages/GestionUsuarios.jsx
import React, { useState, useEffect } from 'react';

// --- Componente Button ---
// NOTA: Se incluye aquí para que el ejemplo sea autocontenido.
// En tu proyecto real, impórtalo desde su propio archivo.
const Button = ({ onClick, children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 text-sm font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform hover:scale-105 duration-150 ease-in-out';

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      case 'primary':
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 w-full';
    }
  };

  const combinedClassName = `${baseStyles} ${getVariantStyles()} ${className}`;

  return (
    <button onClick={onClick} className={combinedClassName} {...props}>
      {children}
    </button>
  );
};


const GestionUsuarios = () => {
  // Estado para la lista de usuarios
  const [usuarios, setUsuarios] = useState([
    { run: '11-1', nombre: 'Juan', apellidos: 'Pérez', correo: 'juan.perez@duoc.cl', tipo: 'Administrador', direccion: 'Av. Siempre Viva 123' },
    { run: '22-2', nombre: 'Ana', apellidos: 'García', correo: 'ana.garcia@duoc.cl', tipo: 'Vendedor', direccion: 'Calle Falsa 456' }
  ]);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    run: '', nombre: '', apellidos: '', correo: '', tipo: '', direccion: ''
  });

  // Estado para saber si estamos editando
  const [editRun, setEditRun] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id.replace('usuario-', '')]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editRun) {
      // Lógica de edición
      setUsuarios(usuarios.map(u => u.run === editRun ? { ...formData, run: editRun } : u));
      setEditRun(null);
    } else {
      // Lógica para agregar nuevo usuario
      setUsuarios([...usuarios, { ...formData, run: formData.run || `temp-${Date.now()}` }]);
    }
    // Limpiar formulario
    setFormData({ run: '', nombre: '', apellidos: '', correo: '', tipo: '', direccion: '' });
  };

  const handleEdit = (usuario) => {
    setEditRun(usuario.run);
    setFormData(usuario);
  };
  
  const handleDelete = (run) => {
    setUsuarios(usuarios.filter(u => u.run !== run));
  };


  return (
    <main className="container admin-container">
      {/* FORMULARIO DE USUARIO */}
      <section className="admin-form">
        <h2>{editRun ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
        <form id="form-usuario" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="usuario-run">RUN</label>
            <input type="text" id="usuario-run" value={formData.run} onChange={handleInputChange} required disabled={!!editRun} />
          </div>
          <div className="field">
            <label htmlFor="usuario-nombre">Nombre</label>
            <input type="text" id="usuario-nombre" value={formData.nombre} onChange={handleInputChange} required />
          </div>
          <div className="field">
            <label htmlFor="usuario-apellidos">Apellidos</label>
            <input type="text" id="usuario-apellidos" value={formData.apellidos} onChange={handleInputChange} required />
          </div>
          <div className="field">
            <label htmlFor="usuario-correo">Correo</label>
            <input type="email" id="usuario-correo" value={formData.correo} onChange={handleInputChange} required placeholder="usuario@duoc.cl" />
          </div>
          <div className="field">
            <label htmlFor="usuario-tipo">Tipo de Usuario</label>
            <select id="usuario-tipo" value={formData.tipo} onChange={handleInputChange} required>
              <option value="">Seleccione</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="usuario-direccion">Dirección</label>
            <input type="text" id="usuario-direccion" value={formData.direccion} onChange={handleInputChange} required />
          </div>
          <Button type="submit">{editRun ? 'Actualizar Usuario' : 'Guardar Usuario'}</Button>
        </form>
      </section>

      {/* LISTADO DE USUARIOS */}
      <section className="admin-listado">
        <h2>Listado de Usuarios</h2>
        <table id="tabla-usuarios">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.run}>
                <td>{user.run}</td>
                <td>{user.nombre}</td>
                <td>{user.apellidos}</td>
                <td>{user.correo}</td>
                <td>{user.tipo}</td>
                <td>{user.direccion}</td>
                <td className="acciones">
                  <Button variant="secondary" onClick={() => handleEdit(user)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDelete(user.run)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default GestionUsuarios;