# VDT backend 2024

[](https://github.com/DoTruong1/vdt-backend/actions/workflows/ci-test.yml)

## Environment Variables

| Tên biến        | Mô tả                                  |
| --------------- |:-------------------------------------- |
| **DB_USER**     | Tên người người dùng của cơ sở dữ liệu |
| **DB_PASSWORD** | Mật khẩu người dùng cơ sở dữ liệu      |
| **DB_NAME**     | Tên của cơ sở dữ liệu                  |
| **DB_HOST**     | Địa chỉ của cơ sở dữ liệu              |
| **DB_PORT**     | Cổng triển khai của cơ sở dữ liệu      |
| **API_PATH**    | Path của API VD: api/v1                |

## Cách cài đặt

Ứng dụng được viết với [Node.js](https://nodejs.org/) ở phiên bản v18.12.0.

##### Bước 1: Cài các dependency

```bash
git clone https://github.com/DoTruong1/vdt-backend.git
cd vdt-backend
npm install
```

##### Bước 2: Thiết lập file ``.env.local``  cho môi trường dev

```vim
DB_USER=<tên user database>
DB_PASSWORD=<mật khẩu của user>
DB_NAME=<Tên database>
DB_PORT=<cổng của database>
DB_HOST=<địa chỉ của database>
API_PATH=<đường dẫn tương đối của api>
```

##### Bước 3: Chạy ứng dụng

```bash
npm run dev
```

# Nội dung Dockerfile

- Image này sử dụng kỹ thuật multi stage để giảm thời gian build image và giảm kích thước của Docker image. Với kỹ thuật multi stage thì nếu như các dependencies trong package.json và package-lock.json không thay đổi thì các bước tải dependencies sẽ được cache lại. Thông qua config ... trong quá trình build

```dockerfile
FROM node:18.20.2 as build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production


FROM node:18.20.2-alpine3.19
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app


CMD [ "dumb-init", "node", "index.js" ]

```

# Output câu lệnh build và docker history

https://ibb.co/3dsPcdF
https://ibb.co/n62t392
https://ibb.co/jGYkwS9
https://ibb.co/Z1Nc8yC

## Thông tin của câu lệnh

![](https://i.ibb.co/Jmxkrkf/image.png)

![](https://i.ibb.co/34XQf2X/image.png)

## Output cậu lệnh build trên môi trường máy ảo chưa được cache lại, chạy giả lập x64 trên kiến trúc arm,

![](https://i.ibb.co/ct9h8jK/image.png)

## Output thời gian build của image trên github action

![](https://i.ibb.co/GcQ2yNz/image.png)

# Build docker image của ứng dụng

```bash
docker built -t <Tên repository>/<tên image>:<tag> .
```

# Cách chạy docker image của ứng dụng

```bash

```

# Các đầu api

| Method   | URL                      | Description                                    |
| -------- | ------------------------ | ---------------------------------------------- |
| `GET`    | `/api/v1/users`          | Lấy danh sách users                            |
| `POST`   | `/api/v1/posts`          | Tạo một user mới                               |
| `GET`    | `/api/v1/users/{userID}` | Lấy thông tin của user có Id là {userID}       |
| `PATCH`  | `/api/v1/users/{userID}` | Cập nhật thông tin của user có id là {userId}. |
| `DELETE` | /api/v1/users/{userID}   | Xoá user có id là {userId}.                    |

# Thank you :)

# 
