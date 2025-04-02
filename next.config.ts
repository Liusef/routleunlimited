/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["gravatar.com"],
    },

};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
