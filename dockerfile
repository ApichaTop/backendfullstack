# ใช้ Node image ที่มี Yarn มาด้วย
FROM node:20

# ตั้ง working directory
WORKDIR /app

# copy package.json และ yarn.lock มาก่อน
COPY package.json yarn.lock ./

# install dependencies
RUN yarn install

# copy source code ทั้งหมด
COPY . .

# generate prisma client
RUN npx prisma generate

# push prisma schema (สำคัญมากถ้าอยาก sync db ตอน build)
RUN npx prisma db push

# build TypeScript
RUN yarn build

# expose port
EXPOSE 4000

# สั่ง start ใน production
CMD ["yarn", "start"]
