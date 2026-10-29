FROM docker.io/library/node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG APP_API_URL=https://encomendas-api.onrender.com
RUN npm run build
RUN APP_API_URL="$APP_API_URL" node -e "const fs = require('node:fs'); const index = 'dist/encomendas/browser/index.html'; const html = fs.readFileSync(index, 'utf8'); const defaultApiUrl = 'https://encomendas-api.onrender.com'; if (!html.includes(defaultApiUrl)) throw new Error('Could not find default API URL in generated index.html'); fs.writeFileSync(index, html.replace(defaultApiUrl, process.env.APP_API_URL));"

FROM docker.io/library/nginx:1.27-alpine

COPY --from=build /app/dist/encomendas/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]