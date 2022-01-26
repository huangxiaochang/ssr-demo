module.exports = {
  apps : [{
    name: 'mian-website',
    script: './server/index.js',
    "instances"  : 4,
    "exec_mode"  : "cluster",
    "env": {
      "COMMON_VARIABLE": "production",
      "NODE_ENV": "production"
    },
    "env_production" : {
       "NODE_ENV": "production"
    },
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
