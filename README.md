# 🎟️ Event RSVP – Fullstack Application

A full-stack demo app where users can view a list of events and RSVP or un-RSVP to them.

---

## 🚀 Features

### 🔧 Frontend (React + Vite + TailwindCSS)
- Responsive event cards with title, date, and description
- RSVP / Un-RSVP toggle button per event
- Clean and modular UI design

### 🖥️ Backend (Node.js + Express)
- APIs to fetch, RSVP, and un-RSVP events
- Simple in-memory JSON store for demo purposes

---

## 🖼️ App Workflow

![Workflow Diagram](https://github.com/user-attachments/assets/037eb58f-d848-4f8c-b28a-c75aac142a85)

---

## 🧱 Data Model

Each **Event** has the following structure:

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "date": "Date",
  "rsvpList": ["userId"]
}
```

> **Note:** For demo purposes, the user ID is hardcoded. No authentication is implemented.

---

## 🧪 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** JSON (in-memory store)
- **Utilities:** Axios (for API communication)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/lakpro/eventRSVP.git
cd eventRSVP
```

### 2. Run the Backend

```bash
cd backend
npm install
npm start
```

> Make sure **nodemon** is installed globally. If not, run:

```bash
node server.js
```

- Server runs at `http://localhost:5000`

### 3. Run the Frontend (in a separate terminal)

```bash
cd frontend
npm install
npm run dev
```

- Frontend runs at `http://localhost:5173`

---

## 🌐 API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/events`               | Get all events with RSVP data        |
| POST   | `/api/events/:id/rsvp`      | RSVP user to an event                |
| POST   | `/api/events/:id/unrsvp`    | Un-RSVP user from an event           |

---

## 🛡️ Scalability & Security

1. ✅ **Throttling Enabled:**  
   The RSVP button is throttled on the frontend to prevent users from spamming requests repeatedly in a short period.

2. 🛑 **Rate Limiting (To Be Added):**  
   Rate limiting can be implemented on the backend using middleware (like `express-rate-limit`) to restrict the number of requests from a single IP within a given timeframe.

3. 🔒 **Temporary IP Ban (Planned):**  
   Users who consistently exceed the rate limit can be temporarily banned or blocked by IP using tools like `express-ip-filter`.

## 📁 Project Structure

```
eventRSVP/
├── backend/
│   ├── controller/
│   ├── data/
│   ├── routes/
│   ├── server.js
│   └── .env (Not required)
├── frontend/
│   ├── components/
│   ├── pages/ (Optional)
│   └── App.jsx
```

---

## 🖼️ Demo Preview

![Event RSVP Demo](https://github.com/user-attachments/assets/05075ce6-a5f7-4023-be72-223200d04863)

---

## 🧑‍💻 Author

**Lakshay (Lakpro)**   - Fullstack Developer 
 
If you'd like to learn more or check out more projects, visit my [portfolio](https://lakpro.github.io).


---
