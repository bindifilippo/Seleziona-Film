# Seleziona Film

## Overview

**Seleziona Film** is a simple full-stack project built to practice a **client-server architecture** with a frontend that consumes data from a Java backend through **REST APIs**.

The idea behind the project is straightforward: display a movie catalog and allow users to explore films by genre. The backend serves structured movie data from a JSON file, while the frontend handles the user interface and interaction logic.

This project is mainly focused on understanding how the frontend and backend communicate, how to organize data, and how to build a small but complete REST-based application.

---

## Features

- Fetches a movie catalog from a backend API
- Displays movie genres dynamically
- Renders films grouped by genre
- Highlights the active genre in the UI
- Separates frontend and backend into independent folders
- Uses a JSON file as a lightweight data source
- Exposes REST endpoints for the full catalog and filtered movie lists

---

## Technologies

### Frontend
- TypeScript
- HTML
- CSS
- Fetch API

### Backend
- Java 17
- Spring Boot
- Spring Web MVC
- Jackson JSON mapping
- Maven

---

## Project Structure

```bash
Seleziona-Film/
├── client/
│   ├── src/
│   │   ├── interaction UI.ts
│   │   ├── object.ts
│   │   └── arrow.svg
│   ├── main.html
│   ├── style.css
│   ├── package.json
│   └── tsconfig.json
│
├── server/
│   ├── src/main/java/it/unito/server/
│   │   ├── ServerApplication.java
│   │   ├── controllers/
│   │   │   └── FilmController.java
│   │   └── model/
│   │       ├── Catalogo.java
│   │       ├── Film.java
│   │       └── Genere.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── catalogo.json
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
└── README.md
