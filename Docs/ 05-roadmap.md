# Roadmap - RAG Lab

## Visión General

Construir un sistema de consulta documental basado en PDFs utilizando React, Go y tecnologías RAG.

---

# Fase 0 - Base del Proyecto ✅

## Frontend

* [x] Crear proyecto React con Vite
* [x] Configurar estructura de componentes
* [x] Crear Header
* [x] Crear QuestionBox
* [x] Crear ResponsePanel
* [x] Implementar historial
* [x] Implementar selector de PDF
* [x] Conectar React con Backend

## Backend

* [x] Crear proyecto Go
* [x] Configurar servidor HTTP
* [x] Crear endpoint POST /preguntar
* [x] Implementar JSON Request/Response
* [x] Configurar CORS

---

# Fase 1 - Gestión de Documentos

Objetivo: almacenar documentos PDF.

## Backend

* [ ] Crear endpoint POST /upload
* [ ] Guardar PDFs en carpeta docs/
* [ ] Validar extensión PDF
* [ ] Manejar errores de carga

## Frontend

* [ ] Subir PDF al backend
* [ ] Mostrar resultado de carga
* [ ] Validar archivo seleccionado

Resultado esperado:

Usuario
↓
Selecciona PDF
↓
Upload
↓
docs/manual.pdf

---

# Fase 2 - Catálogo de Documentos

Objetivo: visualizar documentos cargados.

## Backend

* [ ] Crear endpoint GET /documentos
* [ ] Listar documentos almacenados

## Frontend

* [ ] Mostrar lista de documentos
* [ ] Actualizar automáticamente tras carga

Resultado esperado:

Documentos

✓ manual.pdf
✓ certificados.pdf
✓ ssl.pdf

---

# Fase 3 - Lectura de PDFs

Objetivo: extraer texto.

## Backend

* [ ] Incorporar librería PDF
* [ ] Extraer contenido
* [ ] Procesar múltiples páginas

Resultado esperado:

PDF
↓
Texto plano

---

# Fase 4 - Búsqueda Documental

Objetivo: responder preguntas mediante búsqueda simple.

## Backend

* [ ] Buscar palabras clave
* [ ] Recuperar párrafos relevantes

Resultado esperado:

Pregunta
↓
Búsqueda textual
↓
Respuesta basada en documentos

---

# Fase 5 - Base de Datos

Objetivo: registrar metadatos.

## SQLite

Tabla documentos:

* id
* nombre
* ruta
* fecha_carga
* tamaño

Resultado esperado:

PDF
↓
docs/
↓
SQLite

---

# Fase 6 - Preparación para RAG

Objetivo: fragmentar documentos.

## Backend

* [ ] Dividir texto en chunks
* [ ] Indexar información

Resultado esperado:

PDF
↓
Texto
↓
Chunks

---

# Fase 7 - Embeddings

Objetivo: búsqueda semántica.

## Tecnologías

* Chroma
* Qdrant

## Funcionalidades

* [ ] Generar embeddings
* [ ] Almacenar embeddings
* [ ] Recuperación semántica

Resultado esperado:

Pregunta
↓
Embedding
↓
Chunks relevantes

---

# Fase 8 - Motor RAG

Objetivo: generación inteligente.

## Funcionalidades

* [ ] Integración con LLM
* [ ] Construcción de contexto
* [ ] Respuestas enriquecidas

Resultado esperado:

Pregunta
↓
Recuperación
↓
Contexto
↓
LLM
↓
Respuesta

---

# Fase 9 - Producción

## Infraestructura

* [ ] Docker
* [ ] Docker Compose
* [ ] Logs
* [ ] Configuración por ambiente

## Despliegue

* [ ] Desarrollo
* [ ] Testing
* [ ] Producción

---

# Estado Actual

Fase completada:

✅ Fase 0

Próxima fase:

🎯 Fase 1 - Gestión de Documentos PDF
