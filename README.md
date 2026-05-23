# About

This benchmark compares major Feature Flag SDKs against Switcher Client SDK for JS & Deno.<br> 
Tests included in this benchmark are focused only on average performance and do not reflect nor measure any other specific SDK capabilities.<br> 
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
| Client: switcher-client-deno (local)  |         10.6 ns |    94,470,000 | (  9.5 ns …  36.4 ns) |  10.4 ns |  15.6 ns |  17.4 ns |
| Client: switcher-client-deno (async)  |         46.3 ns |    21,590,000 | ( 44.5 ns …  80.8 ns) |  46.5 ns |  60.1 ns |  65.8 ns |
| Client: unleash (local)               |         55.1 ns |    18,140,000 | ( 46.9 ns … 268.0 ns) |  55.4 ns |  96.7 ns | 111.3 ns |
| Client: switcher-client-js (async)    |        131.5 ns |     7,604,000 | (112.0 ns … 222.8 ns) | 143.2 ns | 189.1 ns | 207.1 ns |
| Client: harness (async)               |        542.8 ns |     1,842,000 | (493.1 ns … 736.4 ns) | 556.9 ns | 718.5 ns | 736.4 ns |
| Client: amplitude-experiment (local)  |          1.4 µs |       721,700 | (  1.3 µs …   2.0 µs) |   1.4 µs |   2.0 µs |   2.0 µs |
| Client: optimizely (local)            |          1.5 µs |       673,400 | (  1.1 µs … 842.7 µs) |   1.4 µs |   3.4 µs |   5.4 µs |
| Client: amplitude-experiment (async)  |         30.0 ms |          33.4 | ( 26.0 ms …  34.4 ms) |  30.3 ms |  34.4 ms |  34.4 ms |

(*) all client SDKs are re-tested whenever there is a new release of any of the SDKs included in the benchmark.