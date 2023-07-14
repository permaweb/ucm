import { test } from "uvu";
import * as assert from "uvu/assert";

// buy backs is the process that the contract takes collected fees from the previous interaction and
// creates an sell order for $zAR. Burns the $zAR by setting its balance to zero
const EYEBLOB_43 = "yfViHER2NCT7lEeR4nWKxG64ar3fKxagTP0OMfZLJmM";
const U = "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw";

test("buyback PIXL", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 10000,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [
      {
        pair: [globalThis.SmartWeave.contract.id, U],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: globalThis.SmartWeave.contract.id,
            price: 100,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  //console.log(JSON.stringify(response, null, 2));
  assert.equal(response?.pairs[0]?.priceData?.vwap, 100);
  assert.ok(true);
});


test("buyback PIXL start dutch auction", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 10000,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  assert.equal(response?.pairs[0]?.orders[0]?.price, 100);
  assert.ok(true);
})

test("buyback PIXL increment dutch auction", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 20000,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };

  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [
      {
        pair: [
          'AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI',
          'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw'
        ],
        orders: [
          {
            id: 'W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y',
            transfer: 'INTERNAL_TRANSFER',
            creator: 'AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI',
            token: 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw',
            price: 100,
            quantity: 100,
            originalQuantity: 100
          }
        ],
        priceData: undefined
      }
    ],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  //console.log(response.pairs[0])
  assert.equal(response?.pairs[0]?.orders[0]?.price, 110);
  assert.ok(true);
})


test("buyback PIXL with no U balance", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 0,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };

  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  //console.log(response.pairs[0])
  assert.equal(state, response);
  assert.ok(true);
})

// people can sell their PIXL for U via the ucm contract
// ucm will will fill these sell orders from the U it takes as a .005 fee
// if no sell orders it will create a limit buy which will increase every create order 
// if it is not filled
// so it could increase forever

// it only runs on the buy
// if buyback tansfering U for pixl is it charging itself a fee for
// you have an asset you give part of balances to ucm
// then you have U someone else
// ucm gives person the asset and you the U
// it keeps .005

// test trying to buy a large amount of PIXL with small amount of U
// test multiple limit buys and multiple limit sells then buyback


test("buyback U, enough for 1 U", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 100,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [
      {
        pair: [globalThis.SmartWeave.contract.id, U],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: globalThis.SmartWeave.contract.id,
            price: 100,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  assert.equal(response?.pairs[0]?.orders[0]?.quantity, 99);
  assert.ok(true);
});



test("buyback U, enough for all U", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 10000,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [
      {
        pair: [globalThis.SmartWeave.contract.id, U],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: globalThis.SmartWeave.contract.id,
            price: 100,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  assert.equal(response?.pairs[0]?.orders[0], undefined);
  assert.ok(true);
});




test("buyback PIXL, not enough for any because the price is extrelly high", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 10000,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [
      {
        pair: [globalThis.SmartWeave.contract.id, U],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: globalThis.SmartWeave.contract.id,
            price: 100000000,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  assert.equal(response?.pairs[0]?.orders[0]?.quantity, 100);
  assert.ok(true);
});




test("buyback PIXL, enough for all PIXL because the price is extremely low, but it is an odd price", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 1000,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [
      {
        pair: [globalThis.SmartWeave.contract.id, U],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: globalThis.SmartWeave.contract.id,
            price: 3,
            quantity: 100,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  assert.equal(response?.pairs[0]?.orders[0], undefined);
  assert.ok(true);
});


test("buyback PIXL, enough for 2 quantity", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 200,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [
      {
        pair: [globalThis.SmartWeave.contract.id, U],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: globalThis.SmartWeave.contract.id,
            price: 100,
            quantity: 3,
            originalQuantity: 100,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  assert.equal(response?.pairs[0]?.orders[0]?.quantity, 1);
  assert.ok(true);
});


test("buyback a single PIXL for a large odd price", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (expr) {
      return null;
    } else {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    block: {
      height: 100000,
    },
    transaction: {
      id: "W44dNBTBJAeNyb4Bo1IG1TI96VGLNah6m8sy9HUKu5Y",
    },
    contract: {
      id: "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI",
    },
    contracts: {
      write(id, input) {
        //console.log(id, input);
        return Promise.resolve({ type: "ok" });
      },
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "AHrcXuowqLwX-EzPhks-Hla3BY7gPMc9XpYDi2sHSCI": 10000,
            },
          });
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
    },
  };
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    balances: {},
    pairs: [
      {
        pair: [globalThis.SmartWeave.contract.id, U],
        orders: [
          {
            id: "xkKyDgsr360TVgy07XwbWOuWXUD2WdXil_Npk8wx8Qg",
            transfer: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
            creator: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
            token: globalThis.SmartWeave.contract.id,
            price: 3000,
            quantity: 1,
            originalQuantity: 1,
          },
        ],
        priceData: {},
      },
    ],
    claimable: [],
    name: "UCM",
    ticker: "PIXL",
    recentRewards: {},
    lastReward: 0,
  };

  const { buyback } = await import("../src/cron/buyback.js");
  const response = await buyback(state);
  assert.equal(response?.pairs[0]?.orders[0], undefined);
  assert.ok(true);
});



test.run();
