import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mathgo/',  // 여기 리포지토리 이름 넣기
  plugins: [react()],
})
