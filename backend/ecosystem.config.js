module.exports = {
    apps: [
      {
        name: 'miniapp',
        script: 'npm',
        args: 'run start',
        cwd: '/app/backend',
        instances: 1,
        exec_mode: 'fork',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  