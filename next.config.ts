import type { NextConfig } from "next/types";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xkwcjqbexgjtdlxamqqf.supabase.co',
        port: '',
      }
    ]
  }
  /*output: 'export'*/
};

export default nextConfig;
