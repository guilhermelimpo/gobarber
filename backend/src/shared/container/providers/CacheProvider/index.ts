import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';
import RegisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  regis: RegisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.regis);
