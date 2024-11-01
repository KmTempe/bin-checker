# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Running with Docker

To run this Next.js application in a Docker container, follow these steps:

1. **Build the Docker Image**:
   Navigate to the root directory of the project and run the following command to build the Docker image:

   ```bash
   docker build -t your-image-name .
   ```

   Replace `your-image-name` with a name of your choice for the Docker image.

2. **Run the Docker Container**:
   After building the image, you can run the Docker container with the following command:

   ```bash
   docker run -p 3000:3000 your-image-name
   ```

   This command maps port 3000 of the container to port 3000 on your host machine, allowing you to access the application via [http://localhost:3000](http://localhost:3000).

3. **View the Application**:
   Open your browser and go to [http://localhost:3000](http://localhost:3000) to see your application running inside the Docker container.

### Note

Make sure you have Docker installed on your machine. You can download and install it from the [Docker website](https://www.docker.com/get-started).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
