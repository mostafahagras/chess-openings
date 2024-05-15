import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV !== "production",
  workboxOptions: {
    disableDevLogs: true,
  },
  fallbacks: {
    document: "/offline"
  }
});

export default withPWA({
  experimental: {
    typedRoutes: true,
  },
});
