import State from './state.ts';
import {
  Client,
  createBatchEventProcessor,
  createInstance,
  createOdpManager,
  createPollingProjectConfigManager,
} from '@optimizely/optimizely-sdk';

export default class OptimizelyLocalState implements State {
  private client?: Client;

  async setupSdk(): Promise<void> {
    // Initialize context

    // 1. Configure your project config manager
    const pollingConfigManager = createPollingProjectConfigManager({
      sdkKey: '[OPTIMIZELY_SDK_KEY]',
      autoUpdate: false, // Optional: enable automatic updates
      updateInterval: 300000, // Optional: update every 5 minutes (in ms)
    });

    // 2. Create an event processor for analytics
    const batchEventProcessor = createBatchEventProcessor({
      batchSize: 10, // Optional: default batch size
      flushInterval: 1000, // Optional: flush interval in ms
    });

    // 3. Set up ODP manager for segments and audience targeting
    const odpManager = createOdpManager();

    // 4. Initialize the Optimizely client with the components
    this.client = createInstance({
      projectConfigManager: pollingConfigManager,
      eventProcessor: batchEventProcessor,
      odpManager: odpManager,
    });

    await this.client
      .onReady()
      .then(() => console.log('Optimizely client is ready'))
      .catch((error) => console.error('Error initializing Optimizely client:', error));

    // warm up the SDK
    this.client?.isFeatureEnabled('my_feature', '1');
  }

  run(): boolean {
    return this.client?.isFeatureEnabled('my_feature', '1') ?? false;
  }
}

if (import.meta.main) {
  const state = new OptimizelyLocalState();
  await state.setupSdk();

  setInterval(() => {
    const time = Date.now();
    const result = state.run();
    console.log(`- ${Date.now() - time} ms - ${result}`);
  }, 1000);
}
