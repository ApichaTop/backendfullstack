FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate
RUN yarn build

EXPOSE 4000

CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && yarn start"]