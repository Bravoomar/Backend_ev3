import Product from "../models/Product.js";

export const productService = {

  // Listar todos los productos
  async getAllProducts() {
    return Product.findAll();
  },

  // Obtener producto por código
  async getProductByCode(codigo) {
    return Product.findByPk(codigo);
  },

  // Crear nuevo producto
  async createProduct(data) {
    const existing = await Product.findByPk(data.codigo);
    if (existing) throw new Error("El código de producto ya existe.");

    return Product.create(data);
  },

  // Actualizar producto
  async updateProduct(codigo, updates) {
    const [updatedRows] = await Product.update(updates, { where: { codigo } });
    if (updatedRows === 0) return null;

    return Product.findByPk(codigo);
  },

  // Eliminar producto
  async deleteProduct(codigo) {
    const deletedRows = await Product.destroy({ where: { codigo } });
    return deletedRows > 0;
  }
};
