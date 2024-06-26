import type { ConfigType } from 'PackageNameByCore';

const conf: Partial<ConfigType> = {
  importOnDemand: {
    lodash: {
      transform: '${member}',
    },
  },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:8001/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
      secure: false,
    },
  },
};

export default conf;
