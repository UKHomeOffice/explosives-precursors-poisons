FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24-v9@sha256:baf6fee695730fcede4a6dd89390b1756ce5b26ce45b39cca3c7cdc63e91a443

USER root

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
