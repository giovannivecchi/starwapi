module.exports = {
  apps: [
    {
      name: 'starwapi',
      script: './node_modules/sucrase/bin/sucrase-node',
      args: './src/server.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: true,
      max_memory_restart: '100M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
