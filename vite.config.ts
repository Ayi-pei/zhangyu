import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false, // 确保 Vite 运行在开发服务器模式
    port: 5173, // 你可以修改端口
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "[name].[ext]" // 确保静态资源不被重命名
      }
    }
  }
});
