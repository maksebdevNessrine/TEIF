XVVV

N
N7C
V

CBN

N
B
N
V

B
B
Bimport path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, 'V/.L LMKVLK JVLCK JLB £DCMLC%V
      CXV¨VP¨V£
      
      V£V
      £V¨V£¨LVPVLC¨
      C
      X£VCLVCV£¨CVC
      £¨VLCLVC%VCM%L.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEM%HNLMLNM%GLµW<%
          µ
          CV£
          £V
          £
          £B£¨B¨BF¨P
          £F£GGF
        £G£
        B
        B
      HH

      N

      NBN
      BNB
            },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
V
BV
B
BV