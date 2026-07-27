# Лендинг — статика: собираем один раз, отдаём nginx. Рантайма Node в проде нет,
# поэтому нечему падать и нечего масштабировать.
FROM node:22-alpine AS build
WORKDIR /app

# Зависимости отдельным слоем: правка контента не переустанавливает пакеты.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Публичный адрес вшивается в сборку (og:url, канонические ссылки), поэтому он аргумент,
# а не переменная запуска: у статики нет момента запуска.
ARG NEXT_PUBLIC_SITE_URL=https://everpine.io
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

FROM nginx:alpine AS runtime
# Конфиг кладём шаблоном: entrypoint образа подставит в него PORT перед стартом nginx.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/out /usr/share/nginx/html

# Значение по умолчанию для локального запуска; платформа перезапишет своим.
ENV PORT=80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
