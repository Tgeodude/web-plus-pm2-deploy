module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './dist/app.js',
    cwd: '/home/user/web-plus-pm2-deploy/backend/source/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: process.env.DEPLOY_REF,
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      ssh_options: 'StrictHostKeyChecking=no',
      key: '/Users/olga/study/ssh-key',
      'pre-deploy-local': 'scp -i /Users/olga/study/ssh-key -o StrictHostKeyChecking=no .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/.env',
      'pre-deploy': '',
      'post-deploy': 'cd backend && npm install && npm run build && pm2 startOrReload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
