module.exports = {
  apps: [
    {
      name: 'teif-backend',
      script: './packages/backend/dist/index.js',
      interpreter: 'node',
      interpreter_args: '--import tsx/esm',
      instances: 6,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
