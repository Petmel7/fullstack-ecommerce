
FROM node:20-alpine AS backend
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate a Prisma client
RUN npx prisma generate

# Compiling TypeScript code
RUN npm run build

CMD ["npm", "start"]

