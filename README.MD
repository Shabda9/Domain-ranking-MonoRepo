# 📈 Domain Ranking Tracker

A full-stack web application that visualizes and compares the historical popularity rankings of websites using the **Tranco List API**.
Leveraging **Vue.js** for the frontend and **NestJS** for the backend, this project uses caching technique in the backend to check if the data existing in the DB is latest or not and sends it, else calls the tranco API to fetch and store new data.

🔴 **Live Demo:** https://domain-ranking-system.pages.dev/

---

## Features

- **Real-time Domain Comparison**
  Compare multiple domains at once (e.g. `google.com, facebook.com`).

- **Interactive Data Visualization**
  Line charts powered by **Chart.js** display ranking trends over time.

- **CI/CD Enabled**
  Fully automated builds and deployments:
  - **Frontend:** Cloudflare Pages
  - **Backend:** Koyeb

- **Database Caching**
  Fetch Real-time Domain Rankings Queries domain rank history from the public Tranco API:
  ```bash
  https://tranco-list.eu/api/ranks/domain/<domain>
  ```
  Caching is done in Postgres SQL:
  - **Caching:** If cached data exists and was updated withing 24 hours, send it back from the DB else call Tranco API and fetch new data.
  - **Multiple Domain:** Multiple domain can be compared that generates lines with multiple colors.
  ```bash
  GET /ranking/google.com,facebook.com,github.com
  ```

---

## Tech Stack

### Frontend
- **Framework:** Vue.js 3 (Composition API)
- **Build Tool:** Vite
- **Charts:** Chart.js, vue-chartjs
- **Styling:** CSS3 (Flexbox & Grid)
- **Design:** Responsive UI

### Backend
- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon Tech)
- **ORM:** Sequelize / TypeORM
- **API:** RESTful architecture

### DevOps
- **Hosting:** Cloudflare Pages (Frontend), Koyeb (Backend)
- **Database Hosting:** Neon Tech
- **CI/CD:** GitHub-based deployments
- **Version Control:** Git & GitHub

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- PostgreSQL database (Neon Tech recommended)

---

## Backend Setup

```bash
cd domain-ranking-be
npm install
```

Create `.env`:

```env
DATABASE_URL=<your neon data base url>
```

Run server:

```bash
npm run start:dev
```

---

## Frontend Setup

```bash
cd domain-ranking-fe
npm install
```

Create `.env.development`:

```env
VITE_API_URL=http://localhost:3000
```

Run app:

```bash
npm run dev
```

---

## Deployment

Automatic deployment on push to `main`:

- **Backend:** Koyeb
- **Frontend:** Cloudflare Pages

---

## Author

**Shabda Manandhar**

---
