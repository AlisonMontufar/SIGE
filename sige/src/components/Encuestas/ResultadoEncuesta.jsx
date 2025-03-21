import { useParams } from "react-router-dom";

const ResultadoEncuesta = () => {
  const { id } = useParams();

  const resultadosFalsos = [
    { pregunta: "¿El profesor explicó claramente los temas?", promedio: "4.5/5" },
    { pregunta: "¿Te sentiste motivado durante el curso?", promedio: "4.2/5" },
    { pregunta: "¿Recomendarías este curso?", promedio: "4.7/5" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Resultados de la Encuesta {id}</h2>
      <ul className="mt-4">
        {resultadosFalsos.map((resultado, index) => (
          <li key={index} className="mb-2">
            <strong>{resultado.pregunta}</strong>: {resultado.promedio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultadoEncuesta;
