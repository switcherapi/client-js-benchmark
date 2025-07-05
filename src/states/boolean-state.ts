import State from './state.ts';

export default class BooleanState implements State {
  private readonly flag = true;

  setupSdk(): void {
    console.log('SDK setup completed for boolean state.');
  }

  run(): boolean {
    return this.flag;
  }
}

if (import.meta.main) {
  const state = new BooleanState();
  state.setupSdk();

  setInterval(() => {
    const time = Date.now();
    const result = state.run();
    console.log(`- ${Date.now() - time} ms - ${JSON.stringify(result)}`);
  }, 1000);
}
