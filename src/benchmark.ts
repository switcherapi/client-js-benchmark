// Harness [ff-nodejs-server-sdk] https://github.com/harness/ff-nodejs-server-sdk
const { default: HarnessAsyncState } = await import('./states/harness-async-state.ts');
const harnessState = new HarnessAsyncState();
await harnessState.setupSdk();

Deno.bench('Client: harness (async)', async () => {
  if (await harnessState.run()) {
    throw new Error('Failed');
  }
});

// Unleash [unleash-client-node] https://github.com/Unleash/unleash-client-node
const { default: UnleaseLocalState } = await import('./states/unleash-local-state.ts');
const unleashState = new UnleaseLocalState();
unleashState.setupSdk();

Deno.bench('Client: unleash (local)', () => {
  if (!unleashState.run()) {
    throw new Error('Failed');
  }
});

// Optimizely [javascript-sdk] https://github.com/Unleash/unleash-client-node
const { default: OptimizelyLocalState } = await import('./states/optimizely-local-state.ts');
const optimizelyState = new OptimizelyLocalState();
await optimizelyState.setupSdk();

Deno.bench('Client: optimizely (local)', () => {
  if (!optimizelyState.run()) {
    throw new Error('Failed');
  }
});

// Amplitude Experiment [@amplitude/experiment-node-server] https://github.com/amplitude/experiment-node-server
const { default: AmplitudeExperimentAsyncState } = await import('./states/amplitude-experiment-async-state.ts');
const amplitudeExperimentAsyncState = new AmplitudeExperimentAsyncState();
await amplitudeExperimentAsyncState.setupSdk();

Deno.bench('Client: amplitude-experiment (async)', async () => {
  if (!await amplitudeExperimentAsyncState.run()) {
    throw new Error('Failed');
  }
});

// Amplitude Experiment [@amplitude/experiment-node-server] https://github.com/amplitude/experiment-node-server
const { default: AmplitudeExperimentLocalState } = await import('./states/amplitude-experiment-local-state.ts');
const amplitudeExperimentLocalState = new AmplitudeExperimentLocalState();
await amplitudeExperimentLocalState.setupSdk();

Deno.bench('Client: amplitude-experiment (local)', async () => {
  if (!amplitudeExperimentLocalState.run()) {
    throw new Error('Failed');
  }
});

// Switcher API [switcher-client-deno ASYNC] https://github.com/optimizely/javascript-sdk
const { default: SwitcherDenoAsyncState } = await import('./states/switcher-deno-async-state.ts');
const switcherDenoAsyncState = new SwitcherDenoAsyncState();
await switcherDenoAsyncState.setupSdk();

Deno.bench('Client: switcher-client-deno (async)', async () => {
  if (!await switcherDenoAsyncState.run()) {
    throw new Error('Fail');
  }
});

// Switcher API [switcher-client-deno LOCAL]
const { default: SwitcherDenoLocalState } = await import('./states/switcher-deno-local-state.ts');
const switcherDenoLocalState = new SwitcherDenoLocalState();
await switcherDenoLocalState.setupSdk();

Deno.bench('Client: switcher-client-deno (local)', () => {
  if (!switcherDenoLocalState.run()) {
    throw new Error('Failed');
  }
});

// Switcher API [switcher-client-js ASYNC]
const { default: SwitcherJsAsyncState } = await import('./states/switcher-js-async-state.ts');
const switcheJsrAsyncState = new SwitcherJsAsyncState();
await switcheJsrAsyncState.setupSdk();

Deno.bench('Client: switcher-client-js (async)', async () => {
  if (!await switcheJsrAsyncState.run()) {
    throw new Error('Failed');
  }
});

// Switcher API [switcher-client-js LOCAL]
const { default: SwitcherJsLocalState } = await import('./states/switcher-js-local-state.ts');
const switcherJsLocalState = new SwitcherJsLocalState();
await switcherJsLocalState.setupSdk();

Deno.bench('Client: switcher-client-js (local)', () => {
  if (!switcherJsLocalState.run()) {
    throw new Error('Failed');
  }
});

// Static boolean state
const { default: BooleanState } = await import('./states/boolean-state.ts');
const booleanState = new BooleanState();
booleanState.setupSdk();

Deno.bench('Static boolean (baseline)', () => {
  if (!booleanState.run()) {
    throw new Error('Fail');
  }
});
