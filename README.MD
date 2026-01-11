# 📈 Domain Ranking Tracker

A full-stack web application that visualizes and compares the historical popularity rankings of websites using the **Tranco List API**.
Built with a **Monorepo architecture**, leveraging **Vue.js** for the frontend and **NestJS** for the backend.

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
