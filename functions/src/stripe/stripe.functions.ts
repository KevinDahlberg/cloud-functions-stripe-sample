import * as functions from 'firebase-functions';
const { logger } = functions;

import {
  handleError,
  paramError,
} from '../core/function-utils/callable-functions';
import { createStripeSession } from './stripe.service';

exports.stripeSession = functions.https.onCall(
  async (data: any, context: any) => {
    try {
      paramError(data, context);
      const sessionId = await createStripeSession(data);
      return sessionId;
    } catch (error) {
      logger.error('error', error);
      throw handleError(
        'internal',
        `unable to create stripe session: ${error?.message || error}`
      );
    }
  }
);
