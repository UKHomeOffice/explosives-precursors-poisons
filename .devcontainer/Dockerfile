FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24-v5@sha256:110c8d92d27c94b5fd55a6442e884d42a835e3f59246e75dc8137afc20293414
USER root

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
