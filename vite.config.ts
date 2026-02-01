import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bpsr_tools/',  // GitHubリポジトリ名に合わせて変更
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
