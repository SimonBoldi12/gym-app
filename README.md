# 🏋️ Gym App

A full-stack gym member management application built with React and Spring Boot.

---

## Features

- **Member management** — add, edit, delete gym members
- **Membership types** — Basic, Standard, Premium, Student
- **Active/inactive filtering** — toggle and filter members by status
- **Member detail view** — view full member info on a dedicated page
- **Statistics dashboard** — total members, active members, monthly revenue, average fee
- **Charts** — membership distribution as Pie chart and Bar chart (Recharts)
- **Form validation** — client-side validation on member create/edit
- **Loading skeletons** — MUI Skeleton components during data fetch
- **Swagger UI** — full API documentation

---

## Tech Stack

**Frontend:** React, Vite, MUI, Recharts, React Router, Axios

**Backend:** Java, Spring Boot, REST API, Spring Validation, Swagger (OpenAPI)

**Database:** MySQL, JPA/Hibernate

**Tools:** Git, CORS configured for local development

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/members` | Create new member |
| `GET` | `/api/members` | List all members (optional `?active=true/false`) |
| `GET` | `/api/members/stats` | Get statistics |
| `GET` | `/api/members/{id}` | Get member by ID |
| `PUT` | `/api/members/{id}/edit` | Update member |
| `PATCH` | `/api/members/{id}/status` | Toggle active status |
| `DELETE` | `/api/members/{id}` | Delete member |

---

## Getting Started

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Runs on `http://localhost:8080`
Swagger UI: `http://localhost:8080/swagger-ui.html`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

## Project Structure

```
gym-app/
├── backend/
│   └── src/main/java/com/example/backend/
│       ├── controller/   # REST controllers
│       ├── service/      # Business logic
│       ├── dto/          # Request/Response DTOs
│       └── ...
└── frontend/
    └── src/
        ├── pages/        # MemberListPage, MemberDetailPage, MemberFormPage, StatsDashboardPage
        ├── hooks/        # useMembers custom hook
        └── ...
```
