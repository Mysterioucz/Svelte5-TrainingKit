# ⚡ Svelte-5 Internship Training Project

> This project is part of **SvelteKit 5 Training** provided by **API PLUS TECH Co., Ltd.**
> It serves as a pre-internship submission

## Features

- 🔐 Authentication via [Lucia](https://lucia-auth.com/)
- 📄 Form handling with [Superform](https://superforms.vercel.app/)
- 🪟 UI powered by [Tailwind CSS](https://tailwindcss.com/) and [Shadcn for Svelte](https://github.com/huntabyte/shadcn-svelte)
- 💳 Stripe integration for secure payments
- 🦺 Type-safe ORM with [Prisma ORM](https://www.prisma.io/)
- 🎨 Icon support via [Lucide Icons](https://lucide.dev/icons)

## 📸 Demo

### 🧑‍💻 User Views

#### 🏠 Home Page
<img src="https://github.com/user-attachments/assets/21c5b256-2a8a-4a4d-829a-21d6afc5dfde" width="450"/>

#### 🛍️ Product Page
<img src="https://github.com/user-attachments/assets/5630079a-2a40-4772-9e54-abaab5528ae6" width="450"/>

#### 💳 Purchase Page
<img src="https://github.com/user-attachments/assets/24a58fa1-25a0-4b44-a1c0-037e7093a53a" width="450"/>

---

### 🛠️ Admin Views

#### 📊 Dashboard
<img src="https://github.com/user-attachments/assets/c43f5adf-220b-4f5d-b6ac-702fb653d650" width="450"/>

#### 📦 Product Management
<img src="https://github.com/user-attachments/assets/59d24cfe-375c-4af4-aa09-d32435205fab" width="450"/>

#### 👥 Customer List
<img src="https://github.com/user-attachments/assets/deb137b0-5910-4968-9b9d-fda4a5eba073" width="450"/>

## 🛠️ Tech Stack

- **Frontend:** Svelte 5, Tailwind CSS, Shadcn UI
- **Backend:** Prisma, Lucia Auth, Stripe
- **Language:** TypeScript
- **Form Handling:** Superform
- **Icons:** Lucide Icons

## 📂 Project Structure

```bash
project-name/
├── src/
│   ├── lib/             # Shared logic, components, stores
│   ├── routes/          # Pages and endpoints
│   ├── hooks.server.ts  # Server hooks (e.g., for auth)
│   └── app.d.ts         # TypeScript types
├── static/              # Public assets
├── prisma/              # Prisma schema and migrations
├── .env         # Environment variable
├── svelte.config.js     # SvelteKit config
├── tailwind.config.ts   # Tailwind config
└── ...
```
## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mysterioucz/Svelte5-TrainingKit.git
cd Svelte5-TrainingKit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Provide your credentials in .env (Stripe keys, Public server URL, Database URL):
For Examples
```
DATABASE_URL="file:./dev.db"

PUBLIC_STRIPE_PUBLIC_KEY = Your Stripe Public Key
STRIPE_SECRET_KEY = Your Stripe Secret Key
PUBLIC_SERVER_URL = http://127.0.0.1:5173 # The URL of your server, used for webhooks and redirects.
```

### 4. Setup the database

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
```

The app will be available at `http://127.0.0.1:5173` (or the port SvelteKit uses).

### 6. For login you can use admin account or create your own user account

```
User: admin
Password: password
```

## 📎 API Routes

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| POST   | /api/payment | Handle Stripe payments   |
| POST   | /login       | User login               |
| GET    | /dashboard   | Protected user dashboard |

## 🙋‍♂️ Author

* [Chatrin Yoonchalard](https://github.com/Mysterioucz)

---

> 📨 Feel free to open an issue or contact me if you have any questions or feedback!
