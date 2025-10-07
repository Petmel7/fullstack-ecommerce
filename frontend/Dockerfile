
# FROM node:20-alpine

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# EXPOSE 3000
# CMD ["npm", "run", "start"]


FROM node:20-bullseye

WORKDIR /app

# Копіюємо package.json для кешування залежностей
COPY package*.json ./
RUN npm ci --omit=dev

# Копіюємо решту файлів
COPY . .

# Збираємо білд
RUN npm run build

# Відкриваємо порт
EXPOSE 3000

# Запускаємо production-сервер
CMD ["npm", "run", "start"]



# FROM node:20-alpine AS builder

# WORKDIR /app
# COPY package*.json ./
# RUN npm ci

# COPY . .
# RUN npm run build

# FROM node:20-alpine AS runner
# WORKDIR /app

# COPY --from=builder /app ./

# EXPOSE 3000
# CMD ["npm", "run", "start"]

