 Chat Supplier Explorer Application

A real-time chat application built with React, TypeScript, and Supabase backend. This application allows users to interact with a chat interface to explore supplier and product information.

## Features

- Real-time chat interface
- Product and supplier information display
- Recent queries history
- Responsive design for mobile and desktop
- Authentication system
- Message persistence using Supabase

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

### Backend
- Supabase (Database & Authentication)
- PostgreSQL
- Row Level Security (RLS)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (Node Package Manager)
- Git

## Installation & Setup

### Frontend Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd chat-supplier-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Backend Setup (Supabase)

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)

2. Set up the messages table in Supabase:
```sql
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  is_bot BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  type TEXT DEFAULT 'text',
  data JSONB,
  user_id UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can insert their own messages"
ON messages FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own messages"
ON messages FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
├── src/
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── integrations/     # External service integrations
│   └── lib/              # Utility functions
├── public/               # Static assets
└── backend/             # Backend configuration
```

## Key Components

- `ChatInterface.tsx`: Main chat interface component
- `ChatMessage.tsx`: Individual message component
- `RecentQueries.tsx`: Recent queries sidebar component

## Authentication

The application uses Supabase Authentication. Users need to be authenticated to:
- Send messages
- View message history
- Access protected routes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.
