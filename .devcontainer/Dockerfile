FROM quay.io/ukhomeofficedigital/hof-nodejs:24.22.1-alpine3.24@sha256:cd92fd7b873764c2a09b1580f721a164c0aca853d18ed0b78f2af461595d534d

USER root

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
