module.exports = {
  apps: [{
    name: 'mesto-frontend',
    script: 'node',
    args: './node_modules/.bin/serve -s build -l 3001',
    cwd: '/home/user/web-plus-pm2-deploy/frontend/source/frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
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
      'pre-deploy-local': '',
      'post-deploy': 'cd frontend && npm install && NODE_OPTIONS=--openssl-legacy-provider npm run build && pm2 startOrReload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
