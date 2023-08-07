// test mint rewards
import { test } from "uvu";
import * as assert from "uvu/assert";

test("create rewards for cycle1", async () => {
  globalThis.SmartWeave = {
    block: {
      height: 1291228,
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    claimable: [],
    name: "marketplace",
    ticker: "zAR",
    streaks: {
      "vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI": {
        days: 45,
        lastHeight: 1291228,
      },
      "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4": {
        days: 1,
        lastHeight: 1291228,
      },
    },
    lastReward: 0,
  };
  const { reward } = await import("../src/cron/reward.js");
  const result = await reward(state);
  //console.log(result)
  assert.equal(
    result.balances["vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI"],
    25920000000
  );
  assert.ok(true);
});

test.run();
