
FROM node:20-alpine AS frontend
WORKDIR /app

# Copy package.json and package-lock.json (for cache)
COPY package*.json ./

# Setting dependencies
RUN npm install

# Copying the entire project
COPY . .

# ⚡️ Building Next.js (creates .next/)
RUN npm run build

# Opening the port for Next.js
EXPOSE 3000

# Running the build in production mode
CMD ["npm", "start"]

