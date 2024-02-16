# Используем базовый образ Node.js
FROM node:latest

# Устанавливаем рабочий каталог внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы вашего приложения в контейнер
COPY . .

# Проверяем, существует ли папка prisma
RUN test -d prisma || (mkdir prisma && cp prisma/schema.prisma prisma/)

# Инициализируем Prisma только в случае, если папка prisma не существует
RUN test -d prisma || npx prisma init

# Устанавливаем binaryTargets в schema.prisma
RUN sed -i 's/"native"/"native", "linux-arm64-openssl-3.0.x"/' prisma/schema.prisma

# Применяем миграции базы данных
RUN #npx prisma migrate dev --preview-feature --schema prisma/schema.prisma

# Генерируем Prisma Client
RUN npx prisma generate

# Открываем порт 8080
EXPOSE 8080

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]
