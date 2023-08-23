# Threadit

Another reddit clone created just for practice with the following tech stack.
Next.js, Typescript, React, Tailwind CSS, Prisma, Redis, NextAuth, React Query, Shadcn-UI

# Setup instructions

1. Clone the repo.
2. Make a copy of .env.example into a private environment variable file.
3. Setup database on planet scale and connect with prisma and obtain db connection string.
4. Set any NextAuth secret (can use SSH)
5. Setup google cloud > API & Services > Credentials for OAuth to obtain google client id and secret.
6. Setup upload thing account and app for file upload storage and obtain app id and secret.
7. Setup upstash account and redis database and obtain REST URL and REST TOKEN/Secret.
8. Run `yarn` to install dependencies.
9. Run `yarn dev` to start development server.
