import State from './state.ts';
import { Client, Target } from 'npm:@harnessio/ff-nodejs-server-sdk';

export default class HarnessAsyncState implements State {
  private client?: Client;
  private target?: Target;

  async setupSdk(): Promise<void> {
    // Initialize context
    this.client = new Client('[HARNESS_API_KEY]', {
      logger: {
        debug: (_: string) => null,
        info: (_: string) => null,
        warn: (_: string) => null,
        error: (_: string) => null,
        trace: (_: string) => null,
      }, // disable logging
      enableStream: true,
      enableAnalytics: false,
      pollInterval: 2 * 60 * 1000, // two min pollInterval
    });
    this.target = {
      identifier: 'javasdk',
      name: 'JavaSDK',
      attributes: {
        location: 'emea',
      },
    };

    try {
      await this.client.waitForInitialization();
      await this.client!.boolVariation('feature_flag', this.target, false); // warm up the SDK
    } catch (e) {
      console.log('Error when authenticating Feature Flags client: ' + e);
    }
  }

  async run(): Promise<boolean> {
    return await this.client!.boolVariation('feature_flag', this.target, false);
  }
}

if (import.meta.main) {
  const state = new HarnessAsyncState();
  state.setupSdk();

  setInterval(async () => {
    const time = Date.now();
    const result = await state.run();
    console.log(`- ${Date.now() - time} ms - ${result}`);
  }, 1000);
}
