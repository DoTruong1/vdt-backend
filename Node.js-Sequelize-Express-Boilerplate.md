# Node.js-Sequelize-Express-Boilerplate

## _with CICD and Jest test framework_

[](https://github.com/FranklinThaker/NodeJs-Sequelize-Express-Jest-CICD-BoilerPlate/actions/workflows/ci.yml)

## 

### Environment Variables

| Tên biến        | Mô tả                                  |
| --------------- |:-------------------------------------- |
| **DB_USER**     | Tên người người dùng của cơ sở dữ liệu |
| **DB_PASSWORD** | Mật khẩu người dùng cơ sở dữ liệu      |
| **DB_NAME**     | Tên của cơ sở dữ liệu                  |
| **DB_HOST**     | Địa chỉ của cơ sở dữ liệu              |
| **DB_PORT**     | Cổng triển khai của cơ sở dữ liệu      |
| **API_PATH**    | Path của API VD: api/v1                |

### Cách cài đặt

Ứng dụng được viết với [Node.js](https://nodejs.org/) ở phiên bản v18.12.0.

###### Bước 1: Cài các dependency

```bash
git clone https://github.com/DoTruong1/vdt-backend.git
cd vdt-backend
npm install
```



###### Bước 2: Thiết lập file ``.env.local``  cho môi trường dev

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



# Build docker image của ứng dụng

```bash
docker built -t <Tên repository>/<tên image>:<tag> .
```

# Thank you :)

# 

## Feel free to connect with me on:

```sh
https://www.instagram.com/axel_blaze_csgo/
https://www.youtube.com/c/FranklinThaker
```
