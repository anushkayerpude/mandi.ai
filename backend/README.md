# Mandi.ai — FastAPI Microservice

Backend geospatial intelligence engine for Mandi.ai.

## Quickstart

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Start development server
uvicorn backend.main:app --reload --port 8000
```

## API Documentation

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/recommend` | Rank Ahmedabad vending locations based on multi-objective scoring |
| `POST` | `/api/inventory-optimize` | Knapsack produce allocation based on APMC rates and shelf life |
| `GET` | `/api/stability-audit/{ward_id}` | Retrieve regulatory stability assessment & legal disclaimer |
| `GET` | `/api/municipal/analytics` | B2G municipal analytics on vendor concentration & food deserts |
| `POST` | `/api/vendor/log-sales` | Ingest daily vendor sales to retrain demand priors |
