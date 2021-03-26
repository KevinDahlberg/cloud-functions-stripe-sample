const functions = require('firebase-functions');
const { logger } = functions;
import { FunctionsErrorCode } from 'firebase-functions/lib/providers/https';

// handles errors
export function handleError(code: FunctionsErrorCode, message: string) {
  logger.error(message);
  return new functions.https.HttpsError(code, message);
}

// handle missing params
export function paramError(data: any, context: any) {
  if (!context.auth) {
    throw handleError('unauthenticated', 'The function must be called with authentication.');
  }

  if (!data) {
    throw handleError('invalid-argument', 'The function requires a product object.');
  }
}
