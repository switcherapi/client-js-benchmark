export default interface State {
  setupSdk: () => Promise<void> | void;
  run(): Promise<boolean> | boolean;
}
