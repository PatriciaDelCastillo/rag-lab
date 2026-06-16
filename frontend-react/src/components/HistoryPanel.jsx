// Componente HistoryPanel que muestra el historial de preguntas realizadas por el usuario, 
// recibe el historial como prop para renderizarlo en la interfaz  
export function HistoryPanel({
  historial,
}) {
  return (
    <div className="respuesta">

      <h3>Historial</h3>

      <ul>
        {historial.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
}