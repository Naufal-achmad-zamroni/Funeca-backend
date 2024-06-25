## How To Install This Repository to Your Local

```bash
git clone https://github.com/panntod/Market-Backend.git
```

Install dependencies

```bash
npm install
```

## How To Migrate Database

```bash
npm run migrate
```

## How To Run This App

```bash
npm run dev
```

## Endpoint

Base Url: `localhost:8000`

- User : `/user/`

| Method | Url       | Description                       |
| ------ | --------- | --------------------------------- |
| POST   | /register | Digunakan untuk membuat data user |
| POST   | /auth     | Digunakan untuk login             |
| DELETE | /logout   | Digunakan untuk Logout            |

- Item : `/item/`

| Method | Url   | Description                                     |
| ------ | ----- | ----------------------------------------------- |
| GET    | /get/ | Digunakan untuk mendapatkan semua data Item     |
| GET    | /:id  | Digunakan untuk mendapatkan data Item sesuai id |
| POST   | /     | Digunakan untuk membuat data Item               |
| PUT    | /:id  | Digunakan untuk update data Item                |
| DELETE | /:id  | Digunakan untuk menghapus data Item             |

- Transaction : `/order/`

| Method | Url | Description                                        |
| ------ | --- | -------------------------------------------------- |
| GET    | /   | Digunakan untuk mendapatkan semua data transaction |
| POST   | /   | Digunakan untuk membuat data transaction           |

- Contact : `/contact/`

| Method | Url | Description                                    |
| ------ | --- | ---------------------------------------------- |
| GET    | /   | Digunakan untuk mendapatkan semua data contact |
| POST   | /   | Digunakan untuk membuat data contact           |
