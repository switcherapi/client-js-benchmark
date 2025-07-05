import State from './state.ts';
import { Client, Switcher } from 'npm:switcher-client@4.4.0';

export default class SwitcherJsAsyncState implements State {
  private switcher?: Switcher;

  async setupSdk(): Promise<void> {
    // Initialize context
    Client.buildContext({
      url: 'https://api.switcherapi.com',
      apiKey: '[SWITCHER_JS_API_KEY]',
      domain: 'Switcher API',
      component: 'switcher-client-js',
      environment: 'default',
    });

    // Initialize the switcher instance
    this.switcher = Client.getSwitcher().throttle(1000);

    // warm up the SDK
    await this.switcher!.isItOn('CLIENT_JS_FEATURE');
  }

  run(): Promise<boolean> {
    return this.switcher!.isItOnBool('CLIENT_JS_FEATURE', true);
  }
}

if (import.meta.main) {
  const state = new SwitcherJsAsyncState();
  await state.setupSdk();

  setInterval(async () => {
    const time = Date.now();
    const result = await state.run();
    console.log(`- ${Date.now() - time} ms - ${JSON.stringify(result)}`);
  }, 1000);
}
