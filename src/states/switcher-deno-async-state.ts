import State from './state.ts';
import { Client, Switcher } from 'jsr:@switcherapi/switcher-client-deno@2.3.0';

export default class SwitcherDenoAsyncState implements State {
  private switcher?: Switcher;

  async setupSdk(): Promise<void> {
    // Initialize context
    Client.buildContext({
      url: 'https://api.switcherapi.com',
      apiKey: '[SWITCHER_DENO_API_KEY]',
      domain: 'Switcher API',
      component: 'switcher4deno',
      environment: 'default',
    });

    // Initialize the switcher instance
    this.switcher = Client.getSwitcher().throttle(2000);

    // warm up the SDK
    await this.switcher!.isItOn('CLIENT_DENO_FEATURE');
  }

  run(): Promise<boolean> {
    return this.switcher!.isItOnBool('CLIENT_DENO_FEATURE', true);
  }
}

if (import.meta.main) {
  const state = new SwitcherDenoAsyncState();
  await state.setupSdk();

  setInterval(async () => {
    const time = Date.now();
    const result = await state.run();
    console.log(`- ${Date.now() - time} ms - ${JSON.stringify(result)}`);
  }, 1000);
}
