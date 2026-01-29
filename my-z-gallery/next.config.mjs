/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的HTMLとして書き出す設定
  images: {
    unoptimized: true, // 外部画像を扱うため最適化をオフにする（SSGでのビルドエラー回避）
  },
  // 開発中のStrict Modeはお好みで
  reactStrictMode: true,
};

export default nextConfig;