import State from './state.ts';

import { Experiment, LocalEvaluationClient } from 'npm:@amplitude/experiment-node-server';

export default class AmplitudeExperimentLocalState implements State {

  private experiment?: LocalEvaluationClient;

  async setupSdk(): Promise<void> {
    this.experiment = Experiment.initializeLocal('[AMPLITUDE_EXPERIMENT_API_KEY]');
    await this.experiment.start();
  }

  run(): boolean {
    const variants = this.experiment!.evaluateV2({ device_id: 'user1' });
    const variant = variants['feature_flag_local'];
    return variant?.value === 'on';
  }
}

if (import.meta.main) {
  const state = new AmplitudeExperimentLocalState();
  await state.setupSdk();

  setInterval(async () => {
    const time = Date.now();
    const result = state.run();
    console.log(`- ${Date.now() - time} ms - ${JSON.stringify(result)}`);
  }, 1000);
}
