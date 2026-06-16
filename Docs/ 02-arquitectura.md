# Arquitectura

## Arquitectura Actual

Frontend React
│
▼
API REST Go
│
▼
Respuesta JSON

## Arquitectura Objetivo

Usuario
│
▼
Frontend React
│
▼
API REST Go
│
├── Gestión de documentos
├── Motor de búsqueda
├── Procesamiento PDF
└── Motor RAG

▼

SQLite
(Metadatos)

▼

Repositorio de PDFs

▼

Base Vectorial
(Chroma / Qdrant)
