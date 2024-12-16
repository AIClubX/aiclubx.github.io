# AI Club X Website

A modern web platform for AI Club X, connecting students, educators, and industry professionals in the field of artificial intelligence.

## Features

- User authentication with Google OAuth
- Chapter management system
- Event organization and registration
- Resource sharing platform
- Admin dashboard
- Interactive chat support

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Express.js
- SQLite (Development)
- Vercel (Deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aiclubx-website.git
   cd aiclubx-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update environment variables in `.env`

5. Start development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Required environment variables:

```
VITE_APP_NAME
VITE_API_URL
DATABASE_URL
JWT_SECRET
VITE_GOOGLE_CLIENT_ID
```

## Deployment

1. Push code to GitHub repository

2. Connect repository to Vercel

3. Configure environment variables in Vercel dashboard

4. Deploy!

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License

MIT License - see LICENSE file for details