# About

This benchmark compares major Feature Flag SDKs against Switcher Client SDK for JS & Deno.<br> 
Tests included in this benchmark are focused only on avarage performance and do not reflect nor measure any other specific SDK capabilities.<br> 
The goal is to gain more knowledge and define a baseline to improve Switcher Client SDK overall performance in the future releases.

## Run

Run the benchmark using Deno task runner. Make sure you have Deno installed and configured in your environment.

```
deno task bench
```

## Tests explained

Tests results are subject to change based on the environment and configuration.

### Async

Uses Promise-based evaluation with in-memory cache by preloading or using async calls to remote API.

### Local

Uses synchronous evaluation with in-memory static configuration loaded from a file or remote API.

### Results

Results are based on the average time per iteration and the number of iterations per second.

| Benchmark                             | Time/Iter (avg) | Iter/s        | (min … max)           | p75      | p99      | p995     |
| ------------------------------------- | --------------: | ------------: | --------------------: | -------: | -------: | -------: |
| Static boolean (baseline)             |          2.3 ns |   441,300,000 | (  2.2 ns …  24.4 ns) |   2.3 ns |   2.9 ns |   3.5 ns |
| Client: switcher-client-deno (local)  |         10.6 ns |    94,470,000 | (  9.6 ns …  33.1 ns) |  10.5 ns |  14.6 ns |  15.6 ns |
| Client: switcher-client-js (local)    |         10.7 ns |    93,770,000 | (  9.6 ns …  50.5 ns) |  10.6 ns |  15.1 ns |  16.4 ns |
| Client: unleash (local)               |         61.5 ns |    16,250,000 | ( 52.6 ns … 111.0 ns) |  62.8 ns |  88.9 ns |  91.4 ns |
| Client: switcher-client-deno (async)  |        126.3 ns |     7,920,000 | (112.7 ns … 182.1 ns) | 131.2 ns | 165.2 ns | 171.1 ns |
| Client: switcher-client-js (async)    |        130.8 ns |     7,643,000 | (116.6 ns … 358.2 ns) | 135.7 ns | 177.2 ns | 186.9 ns |
| Client: harness (async)               |        319.9 ns |     3,126,000 | (288.1 ns … 389.6 ns) | 330.7 ns | 368.0 ns | 389.6 ns |
| Client: amplitude-experiment (local)  |          1.4 µs |       720,800 | (  1.3 µs …   1.8 µs) |   1.4 µs |   1.8 µs |   1.8 µs 
| Client: optimizely (local)            |          1.4 µs |       690,900 | (  1.4 µs …   2.1 µs) |   1.5 µs |   2.1 µs |   2.1 µs |
| Client: amplitude-experiment (async)  |         43.0 ms |          23.2 | ( 38.9 ms …  60.0 ms) |  49.9 ms |  60.0 ms |  60.0 ms |