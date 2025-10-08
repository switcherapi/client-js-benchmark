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
| Client: switcher-client-js (local)    |         10.1 ns |    98,740,000 | (  9.0 ns …  27.4 ns) |  10.2 ns |  15.9 ns |  17.4 ns |
| Client: switcher-client-deno (local)  |         10.2 ns |    97,590,000 | (  9.4 ns …  28.0 ns) |  10.2 ns |  14.8 ns |  15.8 ns |
| Client: unleash (local)               |         61.5 ns |    16,250,000 | ( 52.6 ns … 111.0 ns) |  62.8 ns |  88.9 ns |  91.4 ns |
| Client: switcher-client-deno (async)  |        127.7 ns |     7,833,000 | (116.0 ns … 172.9 ns) | 131.1 ns | 168.2 ns | 168.9 ns |
| Client: switcher-client-js (async)    |        129.8 ns |     7,707,000 | (116.9 ns … 213.4 ns) | 131.7 ns | 190.0 ns | 208.5 ns |
| Client: harness (async)               |        319.9 ns |     3,126,000 | (288.1 ns … 389.6 ns) | 330.7 ns | 368.0 ns | 389.6 ns |
| Client: optimizely (local)            |          1.4 µs |       690,900 | (  1.4 µs …   2.1 µs) |   1.5 µs |   2.1 µs |   2.1 µs |
| Client: amplitude-experiment (local)  |          1.5 µs |       668,200 | (  1.3 µs …   1.9 µs) |   1.5 µs |   1.9 µs |   1.9 µs |
| Client: amplitude-experiment (async)  |        113.6 ms |           8.8 | ( 39.9 ms … 560.5 ms) |  69.8 ms | 560.5 ms | 560.5 ms |