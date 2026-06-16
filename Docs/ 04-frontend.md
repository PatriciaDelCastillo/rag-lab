# Frontend

## Tecnologías

* React
* Vite
* JavaScript
* CSS

## Objetivo

Proveer una interfaz simple para:

* Cargar documentos PDF.
* Realizar consultas.
* Visualizar respuestas.
* Consultar historial.

---

# Estructura

```text
frontend-react/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── QuestionBox.jsx
│   │   └── ResponsePanel.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# Componentes

## Header

Responsable de mostrar:

* Nombre del sistema.
* Descripción principal.

Ejemplo:

RAG Lab

Asistente Inteligente de Documentación

---

## QuestionBox

Responsable de:

* Capturar preguntas.
* Invocar la función consultar().
* Mostrar estado de carga.

---

## ResponsePanel

Responsable de:

* Mostrar la respuesta devuelta por el backend.

---

# Estados React

## pregunta

Almacena la pregunta ingresada por el usuario.

```javascript
const [pregunta, setPregunta] = useState("");
```

---

## respuesta

Almacena la respuesta obtenida desde la API.

```javascript
const [respuesta, setRespuesta] = useState("");
```

---

## archivo

Almacena el PDF seleccionado.

```javascript
const [archivo, setArchivo] = useState(null);
```

---

## historial

Almacena las consultas realizadas.

```javascript
const [historial, setHistorial] = useState([]);
```

---

## loading

Indica si existe una consulta en ejecución.

```javascript
const [loading, setLoading] = useState(false);
```

---

# Funciones

## consultar()

Responsabilidades:

1. Validar la pregunta.
2. Registrar la consulta en el historial.
3. Invocar la API REST.
4. Procesar la respuesta.
5. Actualizar la interfaz.

Flujo:

Usuario
│
▼
Pregunta
│
▼
consultar()
│
▼
POST /preguntar
│
▼
Backend Go
│
▼
Respuesta JSON
│
▼
ResponsePanel

---

## subirPDF()

Responsabilidades actuales:

1. Verificar que exista un archivo seleccionado.
2. Mostrar información del archivo.

Responsabilidades futuras:

1. Enviar PDF al backend.
2. Registrar documento.
3. Actualizar listado de documentos.

---

# Estado Actual

Implementado:

* Header
* Consulta
* Historial
* Respuesta
* Selección de PDF
* Comunicación con backend

Pendiente:

* Upload real de PDF
* Listado de documentos
* Visualización de documentos cargados
* Gestión de errores avanzada
* Autenticación
