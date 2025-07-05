import State from './state.ts';
import { initialize, Unleash } from 'npm:unleash-client';

export default class UnleashLocalState implements State {
  private client?: Unleash;

  setupSdk(): void {
    // Initialize context
    this.client = initialize({
      appName: 'my-application',
      url: 'https://app.unleash-hosted2.com/demo/api/',
      customHeaders: {
        Authorization: '[UNLEASH_API_KEY]',
      },
      bootstrap: {
        filePath: './resources/unleash-bootstrap.json',
      },
    });
  }

  run(): boolean {
    return this.client!.isEnabled('featureX');
  }
}

if (import.meta.main) {
  const state = new UnleashLocalState();
  state.setupSdk();

  setInterval(() => {
    const time = Date.now();
    const result = state.run();
    console.log(`- ${Date.now() - time} ms - ${result}`);
  }, 1000);
}
