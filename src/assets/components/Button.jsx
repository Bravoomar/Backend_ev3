import React from 'react';

/**
 * Un componente de botón reutilizable con diferentes variantes de estilo.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {function} props.onClick - La función a ejecutar cuando se hace clic en el botón.
 * @param {React.ReactNode} props.children - El contenido del botón (texto, íconos, etc.).
 * @param {string} [props.variant='primary'] - La variante de estilo del botón ('primary', 'secondary', 'danger').
 * @param {string} [props.className=''] - Clases de CSS adicionales para personalizar el botón.
 */


const Button = ({ onClick, children, variant = 'primary', className = '' }) => {
  const baseStyles =
    'px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out';
    
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-600';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      case 'primary':
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
    }
  };

  const combinedClassName = `${baseStyles} ${getVariantStyles()} ${className}`;

  return <button onClick={onClick} className={combinedClassName}>{children}</button>;
};

export default Button;
