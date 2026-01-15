# Admin Dashboard - Next.js

Modern bir admin dashboard projesi, Next.js 14 ile geliştirilmiştir.

## Özellikler

- ⚡ Next.js 14 (App Router)
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 📦 ESLint

## Kurulum

Bağımlılıkları yükleyin:

```bash
npm install
```

## Geliştirme

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Diğer Komutlar

- `npm run build` - Production build oluşturur
- `npm run start` - Production sunucusunu başlatır
- `npm run lint` - ESLint ile kod kontrolü yapar

## Proje Yapısı

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Ana sayfa
│   └── globals.css     # Global stiller
├── public/             # Statik dosyalar
├── package.json        # Bağımlılıklar
├── tsconfig.json       # TypeScript yapılandırması
├── tailwind.config.ts  # Tailwind yapılandırması
└── next.config.js      # Next.js yapılandırması
```

