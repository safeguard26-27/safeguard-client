# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# 주의: VITE_ 값은 번들에 포함되어 누구나 볼 수 있다. 공개 가능한 값만 넣을 것.
# .env 는 이미지 레이어에 남기지 않도록 BuildKit secret 으로 마운트한다.
#   docker build --secret id=env,src=.env -t safeguard-client .
RUN --mount=type=secret,id=env,target=/app/.env npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

# 비루트 실행: nginx 사용자가 쓰는 경로(/tmp)만 쓰기 가능, 8080 포트 사용
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
