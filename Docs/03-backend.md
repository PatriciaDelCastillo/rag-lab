# Backend

## Tecnologías

* Go
* net/http
* JSON
* SQLite (pendiente)

## Endpoints Implementados

### POST /preguntar

Recibe:

{
"pregunta": "¿Qué es SSL?"
}

Responde:

{
"respuesta": "..."
}

## Endpoints Planificados

### POST /upload

Subida de documentos PDF.

### GET /documentos

Listado de documentos cargados.

### GET /documentos/{id}

Consulta de información de un documento específico.

## Responsabilidades

* Recepción de consultas.
* Procesamiento de documentos.
* Gestión de almacenamiento.
* Comunicación con el motor RAG.
