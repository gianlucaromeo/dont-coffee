# syntax=docker/dockerfile:1.4
# Dockerfile for Next JS frontend
# Used example: https://markus.oberlehner.net/blog/running-nextjs-with-docker/

# ---- 1ST STAGE BASE ----
FROM node:22-slim AS base

ARG PORT=3000

# Telemetry sends anonymous information (like command usage, build duration, 
# and errors) to Vercel to improve the framework.
ENV NEXT_TELEMETRY_DISABLED=1

# ---- 2ND STAGE DEPS ----
FROM base AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies first for better caching
COPY package*.json ./

# Install exact dependencies for production-like, reproducible installs. 
# Uses lockfile. Good cache layer.
# It deletes the existing node_modules folder first, then performs a clean,
# reproducible install.
RUN npm ci

# ---- 3RD STAGE BUILD ----
FROM base AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Reuse installed node_modules from deps stage.
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Uncomment to enable detailed logging for development
# ENV NODE_OPTIONS='--trace-warnings --trace-deprecation'

# Point Sharp to the installed binary in node_modules. Fixes image plugin
# issues. 
# Sharp is a Node.js library for fast image processing (resize, crop, ..).
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

# <<< DEBUG! >>>
# RUN echo "---- .next directory listing ----" && ls -R .next

# ---- 4TH STAGE RUN ----
FROM base AS run
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

ARG PORT
ENV PORT=${PORT}

# Bind Next.js to all interfaces so Docker port mapping works, allowing access
# from outside the container through Docker’s published ports.
ENV HOSTNAME="0.0.0.0" 

# Create system group with GID 1001.
# System groups are for background services, not human users.
# The explicit GID avoids conflicts and ensures predictable ownership.
RUN addgroup --system --gid 1001 nodejs

# Create system user with UID 1001.
# This user has no login shell or password and minimal privileges.
# It runs the app instead of root, improving container security.
RUN adduser --system --uid 1001 nextjs

# Create necessary directories even if not building.
RUN mkdir -p .next
RUN mkdir -p .next/static

# Give ownership of .next to the non-root user.
RUN chown -R nextjs:nodejs .next

# Copy all files for development mode

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/public ./public
COPY --from=build /app/src ./src
COPY --from=build /app/next.config.ts ./next.config.ts

# Drop root. Run as the created user.
USER nextjs

EXPOSE ${PORT}

CMD npm run dev
