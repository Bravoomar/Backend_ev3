// src/components/FeaturedProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: 'PC Gamer Capuchin', price: '$588.980', image: '/images/product1.jpg' },
    { id: 2, name: 'Teclado Mecánico', price: '$45.990', image: '/images/product2.jpg' },
    { id: 3, name: 'Mouse Gamer', price: '$29.990', image: '/images/product3.jpg' },
  ];

  return (
    <section id="productos" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-semibold mb-8">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg text-gray-700 mb-4">{product.price}</p>
              <Link to={`/producto/${product.id}`} className="text-blue-600 hover:underline">
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
