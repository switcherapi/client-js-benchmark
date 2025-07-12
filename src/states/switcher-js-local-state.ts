import State from './state.ts';
import { Client, Switcher } from 'npm:switcher-client@4.4.1';

export default class SwitcherJsLocalState implements State {
  private switcher?: Switcher;

  async setupSdk(): Promise<void> {
    // Initialize context
    Client.buildContext({
      url: 'https://api.switcherapi.com',
      apiKey: '[SWITCHER_JS_API_KEY]',
      domain: 'Switcher API',
      component: 'switcher-client-js',
      environment: 'default',
    }, {
      local: true,
      freeze: true,
    });

    // Load in-memory snapshot
    await Client.loadSnapshot({ fetchRemote: true });

    // Initialize the switcher instance
    this.switcher = Client.getSwitcher().throttle(1000);
  }

  run(): boolean {
    return this.switcher!.isItOnBool('CLIENT_JS_FEATURE');
  }
}

if (import.meta.main) {
  const state = new SwitcherJsLocalState();
  await state.setupSdk();

  setInterval(() => {
    const time = Date.now();
    const result = state.run();
    console.log(`- ${Date.now() - time} ms - ${JSON.stringify(result)}`);
  }, 1000);
}
