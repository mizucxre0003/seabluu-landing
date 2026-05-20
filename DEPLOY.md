# Deploy to Koyeb from GitHub with Dockerfile

## Как деплоить

1. Запушить проект в GitHub.
2. В Koyeb создать новый Web Service.
3. Source выбрать GitHub repository с этим проектом.
4. Build method выбрать Dockerfile.
5. Dockerfile path оставить `Dockerfile`.
6. Port указать `8000`.
7. Health check path указать `/healthz`.
8. Environment variables не требуются.

Koyeb сам подтянет код из GitHub, выполнит сборку Vite внутри Dockerfile и запустит nginx с готовым `dist`.

## Локальная проверка

Опционально, если Docker Desktop запущен локально:

```bash
docker build -t seabluu-landing .
docker run --rm -p 8000:8000 seabluu-landing
```

После запуска открыть:

```text
http://localhost:8000/
```

Проверка health endpoint:

```text
http://localhost:8000/healthz
```

## Что внутри

Docker образ собирается в два этапа:

1. `node:24-alpine` устанавливает зависимости через `npm ci` и собирает Vite-проект в `dist`.
2. `nginx:1.27-alpine` отдаёт готовую статику из `/usr/share/nginx/html` на порту `8000`.
