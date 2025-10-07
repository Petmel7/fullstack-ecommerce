
# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npx prisma generate

# EXPOSE 5000
# CMD ["npm", "run", "dev"]


FROM node:20-alpine

WORKDIR /app

# Копіюємо package.json для кешування залежностей
COPY package*.json ./
RUN npm ci --omit=dev

# Копіюємо решту файлів
COPY . .

# Генеруємо Prisma клієнт
RUN npx prisma generate

# Відкриваємо порт
EXPOSE 5000

# Запускаємо production-сервер
CMD ["npm", "run", "start"]
