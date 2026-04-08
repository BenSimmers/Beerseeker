import { init } from '@instantdb/admin';
import schema from '@/instant.schema';

const appId = process.env.INSTANT_APP_ID || process.env.NEXT_PUBLIC_INSTANT_APP_ID;
const adminToken = process.env.INSTANT_ADMIN_TOKEN;

if (!appId) {
  throw new Error('Missing INSTANT_APP_ID or NEXT_PUBLIC_INSTANT_APP_ID for admin client.');
}

if (!adminToken) {
  throw new Error('Missing INSTANT_ADMIN_TOKEN for admin client.');
}

export const adminDb = init({
  appId,
  adminToken,
  schema,
  useDateObjects: true,
});
