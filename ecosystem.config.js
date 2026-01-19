module.exports = {
  apps: [
    {
      name: 'teif-backend',
      script: 'tsx',
      args: 'packages/backend/dist/index.js',
      instances: 6,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/var/log/teif/backend-error.log',
      out_file: '/var/log/teif/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: false,
      autorestart: true,
      max_restarts: 5,
      min_uptime: '10s'
    }
  ]
};
