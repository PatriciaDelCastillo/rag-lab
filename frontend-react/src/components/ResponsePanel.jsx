  // Componente ResponsePanel que muestra la respuesta generada por el backend en respuesta a la pregunta realizada por el usuario, 
  // recibe la respuesta como prop para renderizarla en la interfaz  
  
export function ResponsePanel({
  respuesta,
}) {
  return (
    <div className="panel">

      <h2>Respuesta</h2>

      <p>{respuesta}</p>

    </div>
  );
}