import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        NEXT_PUBLIC_APP_VERSION: packageJson.version,
    },
};

export default nextConfig;
