import { useState } from "react";
import { useParams } from "react-router-dom";

const FormularioEncuesta = () => {
  const { id } = useParams();
  const [respuestas, setRespuestas] = useState({});

  const preguntas = [
    "¿El profesor explicó claramente los temas?",
    "¿Te sentiste motivado durante el curso?",
    "¿Recomendarías este curso?"
  ];

  const manejarCambio = (index, valor) => {
    setRespuestas({ ...respuestas, [index]: valor });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log("Respuestas enviadas:", respuestas);
    alert("Encuesta enviada correctamente.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Encuesta {id}</h2>
      <form onSubmit={manejarEnvio}>
        {preguntas.map((pregunta, index) => (
          <div key={index} className="mb-4">
            <p>{pregunta}</p>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Escribe tu respuesta"
              onChange={(e) => manejarCambio(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Enviar Respuestas
        </button>
      </form>
    </div>
  );
};

export default FormularioEncuesta;
