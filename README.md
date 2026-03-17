##  Seleziona Film

Questa applicazione è un progetto didattico che permette di esplorare e selezionare film suddivisi per genere.

Il sistema è composto da:

- **Frontend (TypeScript)**: gestisce l’interfaccia utente e le interazioni, consumando i dati forniti dal backend.
- **Backend (Spring Boot)**: espone API REST che leggono i dati da un file JSON e li rendono disponibili al frontend.

Il backend fornisce endpoint come:
- `/films` → restituisce tutti i film  
- `/films/drammatici` → restituisce i film che nel catalogo appartengono al genere drammatico  

L’obiettivo del progetto è esercitarsi nella costruzione di un’architettura client-server, collegando un frontend dinamico a un backend Java tramite API REST.
