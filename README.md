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
| Client: switcher-client-js (local)    |         10.5 ns |    95,440,000 | (  9.0 ns …  50.5 ns) |  10.2 ns |  21.1 ns |  24.9 ns |
| Client: switcher-client-deno (local)  |         10.6 ns |    94,740,000 | (  9.4 ns …  36.1 ns) |  10.4 ns |  16.6 ns |  18.9 ns |
| Client: unleash (local)               |         72.7 ns |    13,750,000 | ( 58.6 ns … 846.8 ns) |  69.8 ns | 311.4 ns | 325.5 ns |
| Client: switcher-client-deno (async)  |        125.6 ns |     7,961,000 | (109.5 ns … 180.3 ns) | 136.9 ns | 163.3 ns | 164.9 ns |
| Client: switcher-client-js (async)    |        131.5 ns |     7,604,000 | (112.0 ns … 222.8 ns) | 143.2 ns | 189.1 ns | 207.1 ns |
| Client: harness (async)               |        542.8 ns |     1,842,000 | (493.1 ns … 736.4 ns) | 556.9 ns | 718.5 ns | 736.4 ns |
| Client: amplitude-experiment (local)  |          1.4 µs |       689,900 | (  1.3 µs …   1.7 µs) |   1.5 µs |   1.7 µs |   1.7 µs |
| Client: optimizely (local)            |          1.4 µs |       690,000 | (  1.3 µs …   2.1 µs) |   1.5 µs |   2.1 µs |   2.1 µs |
| Client: amplitude-experiment (async)  |         56.4 ms |          17.7 | ( 49.4 ms …  80.1 ms) |  60.2 ms |  80.1 ms |  80.1 ms |

(*) all client SDKs are re-tested whenever there is a new release of any of the SDKs included in the benchmark.