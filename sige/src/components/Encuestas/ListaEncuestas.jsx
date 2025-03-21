import { Link } from "react-router-dom";

const ListaEncuestas = () => {
  const encuestas = [
    { id: 1, titulo: "Evaluación del Profesor" },
    { id: 2, titulo: "Satisfacción del Curso" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Encuestas Disponibles</h2>
      <ul className="mt-4">
        {encuestas.map((encuesta) => (
          <li key={encuesta.id} className="mb-2">
            <Link to={`/encuesta/${encuesta.id}`} className="text-blue-500">
              {encuesta.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEncuestas;
