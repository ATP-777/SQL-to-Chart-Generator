# SQL-to-Chart Generator


AI-powered web app that converts SQL query results (or CSV uploads) into interactive charts.


## Features
- Upload CSV or query data
- Auto-detects chart type (bar, line, scatter, pie)
- Interactive chart rendering
- Export/download charts


## Tech Stack
- **Backend:** FastAPI, Pandas
- **Frontend:** React, Tailwind, Plotly.js
- **Deployment:** Render + Vercel


## Getting Started
### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```


### Frontend
```bash
cd frontend
npm install
npm run dev
```


## License
MIT License
