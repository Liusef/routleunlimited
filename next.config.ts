/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["gravatar.com"],
    },
    allowedDevOrigins: ["localhost", "*.quacksire.dev", "*.routleunlimited.com"],

};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
