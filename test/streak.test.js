import { test } from "uvu";
import * as assert from "uvu/assert";

test("calculate new streak", async () => {
  globalThis.ContractError = function (msg) {
    throw new Error(msg);
  };

  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg);
    }
  };

  globalThis.SmartWeave = {
    block: {
      height: 10000000,
    },
    transaction: {
      id: "S004FI6ADFWNedH-NwUc08dnlxqTDruJLenpfORbj0g",
    },
    contract: {
      id: "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8",
    },
    contracts: {
      readContractState: (id) => {
        const VOUCH_DAO = "_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk"
        if (id === VOUCH_DAO) {
          return Promise.resolve({ vouched: { '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4': 1, '1BS7nloUNSDQhpN8cMNUKIfLeTDKDXSKKsqGqPWl_Jo': 1, 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 1 } })
        }
        return Promise.resolve({ balances: {} })
      },
      write: (id, input) => Promise.resolve({ type: "ok" }),
    },
  };

  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    recentRewards: {},
    lastReward: 0,
    streaks: {
      'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': {
        days: 1,
        lastHeight: 1232144
      }
    },
    balances: {},
    name: "BazAR",
    ticker: "BazAR",
    pairs: [
      {
        pair: [
          "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
          "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        ],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
            price: 100,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
  };

  const action = {
    caller: "vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI",
    input: {
      function: "createOrder",
      pair: [
        "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
      ],
      qty: 10000,
      transaction: "MsflN4glR9noV-DN00ygwKJZmCQS1S1ejbVRmQ5N_Nc",
    },
  };

  const { handle } = await import("../src/index.js");
  const response = await handle(state, action);
  assert.equal(response.result.status, "success");
  assert.ok(true);
});

test("calc streak when buy happens between 720 and 1440 heights", async () => {
  globalThis.ContractError = function (msg) {
    throw new Error(msg);
  };

  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg);
    }
  };

  globalThis.SmartWeave = {
    block: {
      height: 10000740,
    },
    transaction: {
      id: "S004FI6ADFWNedH-NwUc08dnlxqTDruJLenpfORbj0g",
    },
    contract: {
      id: "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8",
    },
    contracts: {
      readContractState: (id) => {
        const VOUCH_DAO = "_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk"
        if (id === VOUCH_DAO) {
          return Promise.resolve({ vouched: { '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4': 1, '1BS7nloUNSDQhpN8cMNUKIfLeTDKDXSKKsqGqPWl_Jo': 1, 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 1 } })
        }
        return Promise.resolve({ balances: {} })
      },
      write: (id, input) => Promise.resolve({ type: "ok" }),
    },
  };

  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    recentRewards: {},
    lastReward: 0,
    streaks: {
      "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4": {
        days: 1,
        lastHeight: 10000000,
      },
      "vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI": {
        days: 2,
        lastHeight: 1
      }
    },
    balances: {},
    name: "BazAR",
    ticker: "BazAR",
    pairs: [
      {
        pair: [
          "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
          "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        ],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
            price: 100,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
  };

  const action = {
    caller: "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4",
    input: {
      function: "createOrder",
      pair: [
        "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
      ],
      qty: 10000,
      transaction: "MsflN4glR9noV-DN00ygwKJZmCQS1S1ejbVRmQ5N_Nc",
    },
  };

  const { handle } = await import("../src/index.js");
  const response = await handle(state, action);

  assert.equal(
    response.state.streaks["9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4"].days,
    2
  );
  assert.equal(response.result.status, "success");
  assert.ok(true);
});

test("streak calc on buy after 5 day streak but greater than 1440 heights", async () => {
  globalThis.ContractError = function (msg) {
    throw new Error(msg);
  };

  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg);
    }
  };

  globalThis.SmartWeave = {
    block: {
      height: 10001740,
    },
    transaction: {
      id: "S004FI6ADFWNedH-NwUc08dnlxqTDruJLenpfORbj0g",
    },
    contract: {
      id: "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8",
    },
    contracts: {
      readContractState: (id) => {
        const VOUCH_DAO = "_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk"
        if (id === VOUCH_DAO) {
          return Promise.resolve({ vouched: { '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4': 1, '1BS7nloUNSDQhpN8cMNUKIfLeTDKDXSKKsqGqPWl_Jo': 1, 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 1 } })
        }
        return Promise.resolve({ balances: {} })
      },
      write: (id, input) => Promise.resolve({ type: "ok" }),
    },
  };

  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    recentRewards: {},
    lastReward: 0,
    streaks: {
      "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4": {
        days: 5,
        lastHeight: 10000000,
      },
    },
    balances: {},
    name: "BazAR",
    ticker: "BazAR",
    pairs: [
      {
        pair: [
          "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
          "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        ],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
            price: 100,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
  };

  const action = {
    caller: "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4",
    input: {
      function: "createOrder",
      pair: [
        "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
      ],
      qty: 10000,
      transaction: "MsflN4glR9noV-DN00ygwKJZmCQS1S1ejbVRmQ5N_Nc",
    },
  };

  const { handle } = await import("../src/index.js");
  const response = await handle(state, action);

  assert.equal(
    response.state.streaks["9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4"].days,
    1
  );
  assert.equal(response.result.status, "success");
  assert.ok(true);
});

test("streak calc on 30 days and between 720 and 1440", async () => {
  globalThis.ContractError = function (msg) {
    throw new Error(msg);
  };

  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg);
    }
  };

  globalThis.SmartWeave = {
    block: {
      height: 10000840,
    },
    transaction: {
      id: "S004FI6ADFWNedH-NwUc08dnlxqTDruJLenpfORbj0g",
    },
    contract: {
      id: "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8",
    },
    contracts: {
      readContractState: (id) => {
        const VOUCH_DAO = "_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk"
        if (id === VOUCH_DAO) {
          return Promise.resolve({ vouched: { '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4': 1, '1BS7nloUNSDQhpN8cMNUKIfLeTDKDXSKKsqGqPWl_Jo': 1, 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 1 } })
        }
        return Promise.resolve({ balances: {} })
      },
      write: (id, input) => Promise.resolve({ type: "ok" }),
    },
  };

  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    recentRewards: {},
    lastReward: 0,
    streaks: {
      "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4": {
        days: 30,
        lastHeight: 10000000,
      },
    },
    balances: {},
    name: "BazAR",
    ticker: "BazAR",
    pairs: [
      {
        pair: [
          "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
          "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        ],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
            price: 100,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
  };

  const action = {
    caller: "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4",
    input: {
      function: "createOrder",
      pair: [
        "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        "cJLpXX2StsvkdPbIHJp2TuTIpdDBRTWouD6o1Ig9-S8",
      ],
      qty: 10000,
      transaction: "MsflN4glR9noV-DN00ygwKJZmCQS1S1ejbVRmQ5N_Nc",
    },
  };

  const { handle } = await import("../src/index.js");
  const response = await handle(state, action);

  assert.equal(
    response.state.streaks["9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4"].days,
    31
  );
  assert.equal(response.result.status, "success");
  assert.ok(true);
});

test.run();
