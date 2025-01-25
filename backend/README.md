# Backend Setup Instructions

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Update database connection in database.py with your PostgreSQL credentials

3. Run the server:
```bash
python main.py
```

The server will start at http://localhost:8000

## API Endpoints:
- POST /api/chat - Send chat queries
  - Request body: { "query": "your question here" }
  - Returns: { "content": "response", "type": "response_type", "data": [] }