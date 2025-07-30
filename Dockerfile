FROM node:18

WORKDIR /app

RUN npx create-directus-project@latest app

WORKDIR /app/app

EXPOSE 8055

CMD ["npx", "directus", "start"]