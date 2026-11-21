# Storybook showcase for @pripman/design-system, served by nginx on port 80.
# The build stage runs the type check and tests first, so a failing test fails the deploy.

FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run typecheck \
 && npm test \
 && npm run build \
 && npm run build-storybook

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
