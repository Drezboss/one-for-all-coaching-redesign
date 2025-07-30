# Directus CMS Docker Scaffold

This is a Docker-based scaffold for setting up a Directus CMS backend, designed to work with a frontend deployed on Vercel.

## 🚀 Quick Start

1. Clone this repo
2. Create a `.env` file based on `.env.example`
3. Run:

```bash
docker-compose up -d
```

4. Visit Directus at [http://localhost:8055](http://localhost:8055) and log in with:
   - Email: `admin@example.com`
   - Password: `strongpassword`

## 🗃️ Collections to Create

In the Directus Admin UI, create these collections:
- `team_members` — name, role, bio, photo
- `programs` — title, description, slug, image
- `testimonials` — author_name, author_title, quote, photo
- `blog_posts` — title, content, cover_image, published_date, slug

## 🧩 Frontend Integration

Fetch content in your Vercel (Next.js) frontend using REST or GraphQL:

Example REST:
```
GET http://localhost:8055/items/programs
```

Example GraphQL:
```graphql
query {
  programs {
    id
    title
    slug
  }
}
```

## ✅ Notes
- Default PostgreSQL DB credentials are in `docker-compose.yml`.
- Make sure to update the frontend to use the correct API URL in production.