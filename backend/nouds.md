
services:
  frontend:
    build:
      context: ./frontend
    env_file:
      - ./frontend/.env.local
    ports:
      - "3001:3000"
    depends_on:
      - backend
    restart: always

  backend:
    build:
      context: ./backend
    env_file:
      - ./backend/.env
    ports:
      - "5000:5000"
    volumes:
      - ./backend/uploads:/app/uploads
    depends_on:
      - db
    restart: always

  db:
    image: postgres:16
    env_file:
      - ./backend/.env
    ports:
      - "5432:5432"
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data: