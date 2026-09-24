import 'dotenv/config';
import { createObserveModule } from '@nestjs/observe';

const { ObserveModule, ObserveInstrument } = createObserveModule({
  sourceContext:
    process.env.OBSERVE_SOURCE_CONTEXT === 'false' ? false : undefined,
});

export { ObserveInstrument };

export const observeModule = ObserveModule.forRoot({
  appKey: process.env.OBSERVE_APP_KEY ?? '',
  appSecret: process.env.OBSERVE_APP_SECRET ?? '',
  serviceId: process.env.OBSERVE_SERVICE_ID ?? 'encomendas-api',
  serviceVersion: process.env.OBSERVE_SERVICE_VERSION,
  endpoint: process.env.OBSERVE_ENDPOINT,
  debug: process.env.OBSERVE_DEBUG === 'true',
  outgoing: {
    database: process.env.OBSERVE_DATABASE !== 'false',
    http: true,
  },
  http: {
    getUserId: (request: { user?: { sub?: number } }) =>
      request.user?.sub !== undefined ? String(request.user.sub) : 'anonymous',
  },
});
