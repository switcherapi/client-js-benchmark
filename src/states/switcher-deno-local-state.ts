import State from './state.ts';
import { Client, Switcher } from 'jsr:@switcherapi/switcher-client-deno@2.3.0';

export default class SwitcherDenoLocalState implements State {
  private switcher?: Switcher;

  async setupSdk(): Promise<void> {
    // Initialize context
    Client.buildContext({
      url: 'https://api.switcherapi.com',
      apiKey: '[SWITCHER_DENO_API_KEY]',
      domain: 'Switcher API',
      component: 'switcher4deno',
      environment: 'default',
    }, {
      local: true,
      static: true,
    });

    // Load in-memory snapshot
    await Client.loadSnapshot({ fetchRemote: true });

    // Initialize the switcher instance
    this.switcher = Client.getSwitcher().throttle(1000);
  }

  run(): boolean {
    return this.switcher!.isItOnBool('CLIENT_DENO_FEATURE');
  }
}

if (import.meta.main) {
  const state = new SwitcherDenoLocalState();
  await state.setupSdk();

  setInterval(() => {
    const time = Date.now();
    const result = state.run();
    console.log(`- ${Date.now() - time} ms - ${JSON.stringify(result)}`);
  }, 1000);
}
