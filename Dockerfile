FROM node:20-bookworm-slim@sha256:2cf067cfed83d5ea958367df9f966191a942351a2df77d6f0193e162b5febfc0

WORKDIR /app

LABEL org.opencontainers.image.title="DAD" \
      org.opencontainers.image.description="Multi-platform mobile growth operations workspace"

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

COPY package.json ./
COPY . .

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server.mjs"]
