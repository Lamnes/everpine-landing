# Лендинг — статика: собираем один раз, отдаём nginx. Рантайма Node в проде нет,
# поэтому нечему падать и нечего масштабировать.
FROM node:22-alpine AS build
WORKDIR /app

# Зависимости отдельным слоем: правка контента не переустанавливает пакеты.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Публичный адрес вшивается в сборку (абсолютный og:image), поэтому он аргумент,
# а не переменная запуска: у статики нет момента запуска.
ARG NEXT_PUBLIC_SITE_URL=
# Запасной вариант: Railway отдаёт домен сервиса сам. Без него забытая переменная означает
# og:image на ещё не существующем everpine.io — то есть пустое превью ссылки в Slack.
ARG RAILWAY_PUBLIC_DOMAIN=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV RAILWAY_PUBLIC_DOMAIN=$RAILWAY_PUBLIC_DOMAIN
RUN npm run build

FROM nginx:alpine AS runtime
# Конфиг кладём шаблоном: entrypoint образа подставит в него PORT перед стартом nginx.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/out /usr/share/nginx/html

# Значение по умолчанию для локального запуска; платформа перезапишет своим.
ENV PORT=80

# Реквизиты Telegram-бота задаются переменными сервиса и подставляются в конфиг при старте.
# Объявлены пустыми намеренно: envsubst заменяет только те переменные, что есть в окружении,
# а необъявленную оставил бы в конфиге строкой ${TG_BOT_TOKEN} — путь до Telegram стал бы
# синтаксически валидным и молча нерабочим.
ENV TG_BOT_TOKEN=
ENV TG_CHAT_ID=
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
