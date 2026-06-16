import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { QuestionBox } from "./components/QuestionBox";
import { ResponsePanel } from "./components/ResponsePanel";

function App() {
  // Estados para la pregunta guarda lo que el usuario escribe en el input de pregunta
  // El estado de pregunta se actualiza cada vez que el usuario escribe en el input de pregunta, 
  // lo que permite que el componente QuestionBox muestre el valor actualizado en tiempo real.  
  const [pregunta, setPregunta] = useState("");
  // Estado para almacenar la respuesta del backend y mostrarla en el panel de respuesta  
  const [respuesta, setRespuesta] = useState("");
  // Estado para almacenar el archivo PDF seleccionado por el usuario y mostrar su nombre en la interfaz  
  const [archivo, setArchivo] = useState(null);
  // Estado para almacenar el historial de preguntas realizadas por el usuario y mostrarlo en la sección de historial   
  const [historial, setHistorial] = useState([]);
  // Estado para indicar si se está cargando la respuesta del backend y mostrar un indicador de carga en el botón de consultar    
  const [loading, setLoading] = useState(false);

  // Función para manejar la consulta al backend cuando el usuario hace clic en el botón de consultar       
  const consultar = async () => {
    try {
      setLoading(true);
      // Agrega la pregunta al historial antes de realizar la consulta al backend para que se muestre inmediatamente en la sección de historial   
      // El historial se actualiza utilizando la función setHistorial, que toma el estado anterior del historial (prev) y agrega la nueva pregunta 
      // al inicio de la lista utilizando el operador de propagación (...prev).
      //  Esto asegura que las preguntas más recientes aparezcan al principio del historial.  
      setHistorial((prev) => [
        pregunta,
        ...prev,
      ]);
      // Verifica que el usuario haya ingresado una pregunta antes de realizar la consulta al backend y muestra una alerta si el campo de pregunta está vacío 
      // El backend no debe procesar consultas vacías, por lo que es importante validar que el usuario haya ingresado una pregunta antes de enviar la solicitud al backend.  
      if (!pregunta.trim()) {
        alert("Ingrese una pregunta");
        return;
      }

      // Realiza la consulta al backend enviando la pregunta en el cuerpo de la solicitud POST y espera la respuesta en formato JSON   
      // El backend debe tener un endpoint en la ruta "/preguntar" que acepte solicitudes POST con un cuerpo JSON que contenga la propiedad
      //  "pregunta", por ejemplo: { "pregunta": "¿Cuál es la capital de Francia?" }  
      // El backend debe procesar la pregunta recibida, generar una respuesta adecuada y devolverla en formato JSON con una propiedad 
      // "respuesta", por ejemplo: { "respuesta": "La capital de Francia es París." }
      const response = await fetch(
        "http://localhost:8081/preguntar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pregunta,
          }),
        }
      );

      // Verifica si la respuesta del backend es exitosa (código de estado 200) y lanza un error si no lo es para manejarlo en el bloque catch 
      // El backend debe devolver un código de estado 200 si la consulta fue exitosa, y en caso de error debe devolver un código de estado diferente (por ejemplo, 400 o 500)
      //  junto con un mensaje de error en el cuerpo de la respuesta.
      //  Esto permitirá que el frontend maneje adecuadamente los errores y muestre un mensaje de error al usuario en lugar de intentar procesar una respuesta no válida.
      if (!response.ok) {
        throw new Error(
          `Error en la consulta: ${response.statusText}`
        );
      }
      // Extrae la respuesta del backend en formato JSON y actualiza el estado de respuesta para mostrarla en el panel de respuesta, 
      // además de limpiar el campo de pregunta para que el usuario pueda ingresar una nueva pregunta    
      // El backend debe devolver un objeto JSON con una propiedad "respuesta" que contenga la respuesta a la pregunta realizada por el usuario,
      //  por ejemplo: { "respuesta": "La respuesta a tu pregunta es..." }
      const data = await response.json();
      setRespuesta(data.respuesta);
      setPregunta("");

    } catch (error) {
      console.error(error);
      setRespuesta(
        "Error al conectar con el backend"
      );
      // En caso de error, se muestra un mensaje de error genérico en el panel de respuesta para informar al usuario que hubo un problema al conectar con el backend.
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la subida del archivo PDF seleccionado por el usuario y mostrar su nombre en la interfaz  
  // El backend no procesa realmente el archivo PDF en esta función, ya que el objetivo principal es mostrar el nombre del archivo seleccionado en la interfaz de usuario.  
  //  Sin embargo, en una implementación real, esta función podría extenderse para enviar el archivo PDF al backend para su procesamiento o almacenamiento.
  const subirPDF = () => {
    // Verifica que el usuario haya seleccionado un archivo PDF antes de intentar mostrar su nombre y muestra una alerta si no se ha seleccionado ningún archivo  
    // El usuario debe seleccionar un archivo PDF utilizando el input de tipo "file" antes de hacer clic en el botón de subir documento. Si no se ha seleccionado ningún archivo,
    //  se muestra una alerta indicando que se debe seleccionar un PDF.
    if (!archivo) {
      alert("Seleccione un PDF");
      return;
    }
    // Muestra una alerta con el nombre del archivo PDF seleccionado por el usuario para confirmar que se ha seleccionado correctamente   
    alert(
      `PDF seleccionado: ${archivo.name}`
    );
  };
  // El componente principal de la aplicación que renderiza la interfaz de usuario, 
  // incluyendo el encabezado, el panel de documentos,
  //  el cuadro de pregunta, 
  // el panel de respuesta y el historial de preguntas realizadas por el usuario. 
  return (
    <div className="container">

      <Header />

      <div className="panel">

        <h2>Documentos</h2>
        // Input para seleccionar un archivo PDF, que acepta solo archivos con extensión .pdf y actualiza el estado de archivo con el archivo seleccionado por el usuario   
        // El usuario debe seleccionar un archivo PDF utilizando este input, y
        //  el estado de archivo se actualizará con el archivo seleccionado para mostrar su nombre en la interfaz y permitir su procesamiento posterior si es necesario. 
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setArchivo(e.target.files[0])
          }
        />
        // Si se ha seleccionado un archivo PDF, se muestra un párrafo con el nombre del archivo para confirmar que se ha seleccionado correctamente 
        // El nombre del archivo PDF seleccionado se muestra en la interfaz para que el usuario pueda confirmar que ha seleccionado el archivo correcto antes de hacer
        //  clic en el botón de subir documento.    
        {
          archivo && (
            <p>
              Archivo seleccionado:
              {" "}
              {archivo.name}
            </p>
          )
        }
        // Botón para subir el documento PDF seleccionado por el usuario, que llama a la función subirPDF al hacer clic
        // para mostrar el nombre del archivo seleccionado en una alerta 
        <button onClick={subirPDF}>
          Subir Documento
        </button>

      </div>
        // Componente QuestionBox que recibe la pregunta, la función para actualizar la pregunta, la función para consultar al backend y 
        // el estado de carga para mostrar un indicador de carga en el botón de consultar
      <QuestionBox
        pregunta={pregunta}
        setPregunta={setPregunta}
        consultar={consultar}
        loading={loading}
      />
        // Componente ResponsePanel que recibe la respuesta del backend para mostrarla en el panel de respuesta 
        // El panel de respuesta muestra la respuesta generada por el backend en respuesta a la pregunta realizada por el usuario.
      <ResponsePanel
        respuesta={respuesta}
      />
      // Sección de historial que muestra las preguntas realizadas por el usuario, utilizando el estado de historial para renderizar una lista de preguntas   
      <div className="panel">

        <h2>Historial</h2>
        // Renderiza una lista de preguntas realizadas por el usuario utilizando el estado de historial, 
        // donde cada pregunta se muestra como un elemento de lista (li) dentro de una lista no ordenada (ul) 
        <ul>
          {
            historial.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )
          }
        </ul>

      </div>

    </div>
  );
}

export default App;