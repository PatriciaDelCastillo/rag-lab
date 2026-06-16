
// Componente QuestionBox que recibe la pregunta, la función para actualizar la pregunta, la función para consultar al backend y 
// el estado de carga para mostrar un indicador de carga en el botón de consultar 
export function QuestionBox({
  pregunta,
  setPregunta,
  consultar,
  loading,
}) {
  return (
    <div className="panel">

      <label htmlFor="pregunta">
        Pregunta
      </label>
      // Campo de entrada de texto para que el usuario escriba su pregunta, que actualiza el estado de pregunta al cambiar su valor   
      //  El campo de entrada de texto tiene un placeholder que indica al usuario que debe escribir una pregunta, y
      //   su valor está vinculado al estado de pregunta para reflejar los cambios en la interfaz. 
      <input
        id="pregunta"
        name="pregunta"
        type="text"
        value={pregunta}
        onChange={(e) =>
          setPregunta(
            e.target.value
          )
        }
        placeholder="Escriba una pregunta..."
      />

      <button
        onClick={consultar}
        disabled={loading}
      >
        {
          loading
            ? "Consultando..."
            : "Consultar"
        }
      </button>

    </div>
  );
}