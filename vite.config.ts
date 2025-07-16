/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mathgo/',  // 여기 리포지토리 이름 넣기
  plugins: [react()],
})
*/
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ✅ Vercel에서는 base 설정 절대 넣지 마세요!
})
