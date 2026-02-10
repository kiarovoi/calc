# Pricing Calculator (готовый шаблон)

Готовая статическая страница калькулятора для сайта.

## Локальный запуск

Откройте файл `index.html` в браузере.

## Деплой на GitHub

```bash
git add calc
git commit -m "add pricing calculator landing"
git push
```

Если нужен отдельный репозиторий:

```bash
mkdir my-calculator-site && cp -R calc/* my-calculator-site/
cd my-calculator-site
git init
git add .
git commit -m "init calculator"
# дальше подключаете origin и пушите
```

## Деплой на Vercel

1. Зайдите в Vercel и нажмите **Add New Project**.
2. Импортируйте репозиторий с этим проектом.
3. В настройках:
   - Framework Preset: **Other**
   - Root Directory: `calc` (если монорепа)
4. Нажмите **Deploy**.

## Подключение домена

1. В проекте Vercel откройте `Settings -> Domains`.
2. Добавьте свой домен (`example.com`).
3. У регистратора домена настройте DNS:
   - `A` запись для корня домена на `76.76.21.21`
   - `CNAME` для `www` на `cname.vercel-dns.com`
4. Дождитесь верификации в Vercel (обычно 5-30 минут, иногда до 24 часов).

## Где менять цены

Все формулы и коэффициенты в `script.js`:

- `BASE_PRICE`
- `DURATION_MULTIPLIER`
- `FORMAT_MULTIPLIER`
- `packageDiscount()`
