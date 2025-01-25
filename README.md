# AI-Powered Chatbot for Supplier and Product Information

A sophisticated chatbot application that enables users to query product and supplier information using natural language processing. Built with React frontend, Python backend using LangGraph, and PostgreSQL database.

## Features

### Frontend
- Real-time chat interface with natural language processing
- Responsive design using Tailwind CSS
- Recent queries history
- Structured display of product and supplier information
- Error handling and loading states

### Backend
- LangGraph-powered chatbot for intelligent responses
- Integration with open-source LLM for text summarization
- PostgreSQL database for data persistence
- FastAPI server for efficient API handling

### Database
- Structured schema for products and suppliers
- Efficient querying system
- Row Level Security (RLS) implementation

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Axios for API calls
- Context API for state management

### Backend
- Python 3.9+
- FastAPI
- LangGraph
- Open-source LLM (Hugging Face models)
- PostgreSQL
- SQLAlchemy ORM

## Prerequisites

Before starting, ensure you have:
- Node.js (v16 or higher)
- Python 3.9+
- PostgreSQL 13+
- Git

## Installation

### Frontend Setup

1. Clone the repository:
```bash
git clone <https://github.com/Ankit389/AI-Powered-Chatbot-for-Supplier-and-Product-Information.git>
cd chatbot-supplier-explorer
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:8000

```

4. Start frontend development server:
```bash
npm run dev
```

### Backend Setup

1. Set up Python virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install backend dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file in backend directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/chatbot_db
LLM_API_KEY=your_huggingface_api_key
```

4. Initialize database:
```bash
python scripts/init_db.py
```

5. Start backend server:
```bash
uvicorn main:app --reload
```

### Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE chatbot_db;
```

2. Create tables:
```sql
-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    supplier_id INTEGER REFERENCES suppliers(id)
);

-- Suppliers Table
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_info TEXT NOT NULL,
    product_categories TEXT[]
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
```

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/          # Context API files
│   │   ├── hooks/            # Custom React hooks
│   │   ├── types/            # TypeScript definitions
│   │   └── utils/            # Utility functions
│   └── public/               # Static assets
├── backend/
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── models/          # Database models
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── scripts/             # Database scripts
│   └── tests/               # Backend tests
└── docs/                    # Documentation
```

## API Endpoints

### Products
- GET /api/products - List all products
- GET /api/products/{id} - Get product details
- GET /api/products/brand/{brand} - Get products by brand

### Suppliers
- GET /api/suppliers - List all suppliers
- GET /api/suppliers/{id} - Get supplier details
- GET /api/suppliers/category/{category} - Get suppliers by category

### Chat
- POST /api/chat - Send chat message
  - Request body: { "message": "your question here" }
  - Returns: { "response": "chatbot response", "data": [] }

## Sample Queries

The chatbot handles various types of queries:
```
"Show all products from Apple"
"List suppliers providing laptops"
"Get details for iPhone 13"
"What's the price range for gaming laptops?"
```

## Development

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

### Code Style
- Frontend: ESLint + Prettier
- Backend: Black + isort

## Deployment

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
python scripts/prepare_deploy.py
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support:
- Open an issue in the repository
- Contact: support@example.com

## Acknowledgments

- LangGraph community
- Hugging Face team
- Open-source LLM contributors
