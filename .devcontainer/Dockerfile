FROM node:20.19.0-alpine3.21@sha256:37a5a350292926f98d48de9af160b0a3f7fcb141566117ee452742739500a5bd

USER root

# Update the package index and upgrade all installed packages to their latest versions
RUN apk update && apk upgrade

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
