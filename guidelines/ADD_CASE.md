# Как Добавлять Новый Кейс

Ниже быстрый рабочий процесс под текущую архитектуру проекта.

## 1) Подготовь папку с ассетами

Создай папку проекта в:

`src/assets/projects/<ИМЯ_ПАПКИ>`

Минимальный набор:

- `cover.png` (оригинал для fullscreen)
- `cover_preview.png` (превью для карточек и списков)
- остальные изображения кейса: `1.png`, `2.png`, ...
- превью для них: `1preview.png`, `2preview.png`, ...

Если есть айдентика:

`src/assets/projects/<ИМЯ_ПАПКИ>/identity`

и внутри аналогично:

- `1.png`, `2.png`, ...
- `1preview.png`, `2preview.png`, ...

## 2) Добавь импорты в `projects.ts`

Файл:
`src/app/data/projects.ts`

Добавь импорты `cover`, `cover_preview`, изображений и превью по аналогии с существующими кейсами.

## 3) Добавь объект кейса в `baseProjects`

В `baseProjects` добавь новый объект `ProjectItem`:

- `id` (уникальный)
- `slug` (уникальный, латиницей)
- `title`, `description`, `summary`, `client`, `year`, `duration`, `role`
- `challenge`, `solution`, `result`
- `deliverables` (массив строк)
- `metrics` (массив `{ label, value }`)
- `gallery` и `galleryPreview`
- при необходимости `clientUrl`, `clientNote`

`slug` определяет URL кейса:

`/portfolio/<slug>`

## 4) Добавь маппинг папки (важно для identity)

В объекте `projectAssetFolderBySlug` добавь запись:

`"<slug>": "<ИМЯ_ПАПКИ>"`

Иначе auto-подтягивание изображений из `identity/` не сработает.

## 5) Проверь категорию и фильтрацию

Допустимые категории сейчас:

- `ui`
- `web`
- `graphic`

По ним работает фильтр на странице портфолио.

## 6) Локальная проверка перед push

```bash
npm run check:encoding
npm run build
```

Если сборка успешна, кейс готов к публикации.

## 7) Публикация

1. Создай ветку `feature/add-<slug>`.
2. Commit + push.
3. PR в `main`.
4. После merge сайт обновится автоматически (если подключен Vercel/Netlify).
