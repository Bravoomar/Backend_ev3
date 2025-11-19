// src/pages/GestionProductos.jsx
import React from 'react';

const GestionProductos = () => {
  return (
    <main className="container admin-container">
      {/* FORMULARIO DE PRODUCTO */}
      <section className="admin-form">
        <h2>Agregar / Editar Producto</h2>
        <form id="form-producto" noValidate>
          <div className="field">
            <label htmlFor="producto-codigo">Código producto</label>
            <input type="text" id="producto-codigo" required minLength={3} />
          </div>
          <div className="field">
            <label htmlFor="producto-nombre">Nombre</label>
            <input type="text" id="producto-nombre" required maxLength={100} />
          </div>
          <div className="field">
            <label htmlFor="producto-descripcion">Descripción</label>
            <textarea id="producto-descripcion" maxLength={500}></textarea>
          </div>
          <div className="field">
            <label htmlFor="producto-precio">Precio</label>
            <input type="number" id="producto-precio" required min={0} step={0.01} />
          </div>
          <div className="field">
            <label htmlFor="producto-stock">Stock</label>
            <input type="number" id="producto-stock" required min={0} step={1} />
          </div>
          <div className="field">
            <label htmlFor="producto-categoria">Categoría</label>
            <select id="producto-categoria" required>
              <option value="">Seleccione...</option>
              <option value="hardware">Hardware</option>
              <option value="perifericos">Periféricos</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="producto-imagen">URL Imagen</label>
            <input type="text" id="producto-imagen" />
          </div>
          <button type="submit">Guardar Producto</button>
        </form>
      </section>

      {/* LISTADO DE PRODUCTOS */}
      <section className="admin-listado">
        <h2>Listado de Productos</h2>
        <table id="tabla-productos">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí los productos se agregarán dinámicamente */}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default GestionProductos;
