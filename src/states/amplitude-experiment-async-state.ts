import State from './state.ts';

import { Experiment, RemoteEvaluationClient } from 'npm:@amplitude/experiment-node-server';

export default class AmplitudeExperimentAsyncState implements State {

  private experiment?: RemoteEvaluationClient;

  async setupSdk(): Promise<void> {
    this.experiment = Experiment.initializeRemote('[AMPLITUDE_EXPERIMENT_API_KEY]', {
      fetchTimeoutMillis: 500,
      fetchRetries: 1,
      fetchRetryBackoffMinMillis: 0,
      fetchRetryTimeoutMillis: 500,
    });
  }

  async run(): Promise<boolean> {
    const variants = await this.experiment!.fetchV2({ user_id: 'user1' });
    const variant = variants['feature_flag'];
    return variant?.value === 'on';
  }
}

if (import.meta.main) {
  const state = new AmplitudeExperimentAsyncState();
  await state.setupSdk();

  setInterval(async () => {
    const time = Date.now();
    const result = await state.run();
    console.log(`- ${Date.now() - time} ms - ${JSON.stringify(result)}`);
  }, 1000);
}
