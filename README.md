# BIN Checker

A simple, fast, and privacy-focused tool to look up Credit Card BIN (Bank Identification Number) details.

## Features

-   **Dual Data Source**: Checks an online database first, falls back to a local offline database (~27MB CSV) if the online source fails.
-   **Performance**: In-memory caching for instant results after the first lookup.
-   **API**: Provides a JSON API for BIN lookups.
-   **Dockerized**: Optimized for production with a small footprint (Alpine Linux).

## Getting Started

### Run Locally

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000).

### Run with Docker

We use Docker Compose for a production-ready setup with healthchecks and log rotation.

1.  Build and start the container:
    ```bash
    docker compose up -d --build
    ```
2.  Open [http://localhost:3000](http://localhost:3000).
3.  View logs:
    ```bash
    docker logs -f bin-checker-bin-check-1
    ```

## API Usage

You can use the API directly:

```
GET /api/bin?bin=45717360
```

**Response:**
```json
{
  "BIN": "45717360",
  "Brand": "VISA",
  "Type": "DEBIT",
  "Category": "CLASSIC",
  "Issuer": "JYSKE BANK A/S",
  "CountryName": "DENMARK",
  "source": "Online"
}
```

```

## Deployment

### Vercel
This project is deployed on Vercel:
[https://bin-checker-79ewotnqz-kmtempes-projects.vercel.app](https://bin-checker-79ewotnqz-kmtempes-projects.vercel.app)

You can run the production image directly from GitHub Container Registry:

1.  Download `docker-compose.prod.yml`.
2.  Run:
    ```bash
    docker compose -f docker-compose.prod.yml up -d
    ```
