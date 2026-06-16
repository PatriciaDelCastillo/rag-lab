
// Componente UploadPanel que permite al usuario cargar documentos PDF, 
// recibe las funciones para subir el PDF y actualizar el estado del archivo seleccionado   
// El componente UploadPanel proporciona una interfaz para que el usuario seleccione un archivo PDF de su dispositivo y lo suba al backend,
//  utilizando las funciones proporcionadas como props para manejar la selección y subida del archivo.  
export function UploadPanel({subirPDF, setArchivo}) {
  return (
    <div className="panel">
        <h3>Documentos</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setArchivo(e.target.files[0])
        }
      />

      <button onClick={subirPDF}>
        Subir Documento
      </button>
    </div>
  );
}