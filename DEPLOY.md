# Deploy And Support Guide

Этот проект сделан на `Vite + React` и собирается в статический сайт (`dist/`).
Самый удобный прод-процесс: GitHub + автодеплой (Vercel/Netlify).

## 1) Подготовка репозитория

1. Создайте репозиторий на GitHub.
2. Залейте текущий проект:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

## 2) Деплой на Vercel (рекомендуется)

1. Зайдите в [Vercel](https://vercel.com/) и нажмите `Add New -> Project`.
2. Подключите GitHub-репозиторий.
3. Build settings:
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
4. Нажмите `Deploy`.

После этого каждый push в `main` будет автоматически выкатывать новую версию.

## 3) Альтернатива: Netlify

1. Зайдите в [Netlify](https://www.netlify.com/) и создайте сайт из Git (`Add new site -> Import an existing project`).
2. Build settings:
- Build command: `npm run build`
- Publish directory: `dist`
3. Нажмите `Deploy site`.

## 4) Подключение домена

1. В панели Vercel/Netlify откройте `Domains`.
2. Добавьте ваш домен (`example.com`).
3. Пропишите DNS-записи у регистратора.
4. Дождитесь выпуска SSL-сертификата (обычно автоматически).

## 5) Ежедневная работа и поддержка

Рекомендуемый простой процесс:

1. Создайте ветку от `main`: `feature/<short-name>`.
2. Внесите изменения.
3. Проверьте проект локально:

```bash
npm run build
```

4. Закоммитьте и отправьте ветку.
5. Сделайте Pull Request в `main`.
6. После merge произойдёт автодеплой.

## 6) Что уже автоматизировано в этом проекте

Добавлен workflow GitHub Actions:

- файл: `.github/workflows/ci-build.yml`
- запускается на `push` и `pull_request` в `main`
- проверяет установку зависимостей и успешную сборку

## 7) Бэкапы

Практика перед крупными изменениями:

1. Создать архив проекта в `backups/`.
2. Убедиться, что backup создан успешно.
3. Только потом делать массовые правки.

## 8) Частые проблемы

1. Пустая страница после деплоя:
- проверьте, что output directory = `dist`
- проверьте, что билд проходит локально (`npm run build`)

2. Изменения не появились:
- убедитесь, что merge сделан в `main`
- проверьте статус последнего деплоя в панели хостинга

3. Ошибки с ассетами:
- не переименовывайте папки `src/assets/projects/...` хаотично
- для новых кейсов используйте единый формат (см. `guidelines/ADD_CASE.md`)
