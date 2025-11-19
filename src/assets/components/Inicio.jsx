import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate(); // Hook para navegar

  const irAProductos = () => {
    navigate('/producto'); // Ruta que definiste en React Router
  };

  return (
    <>
      {/* Tu JSX aquí */}
    </>
  );
};

