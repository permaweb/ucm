import { test } from "uvu";
import * as assert from "uvu/assert";
import fs from 'fs'

const _state = JSON.parse(fs.readFileSync('./test/state.json', 'utf-8'))

globalThis.ContractAssert = function (expr, msg) {
  if (!expr) {
    throw new Error(msg);
  }
};

test("create order with no limits but vwap set", async () => {
  const state = _state;

  const action = {
    caller: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
    input: {
      function: "createOrder",
      pair: [
        "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        "zd2kru3ejbBASyuciEDt8BOzZLpcOUfyork1M8NCC6U"
      ],
      qty: 1000000,
      transaction: "_cgC5BGpH9A_HWIOd1FA0L1nxL0etq_xaOA7JxmK9f8",
    },
  };

  globalThis.ContractAssert = function (exp, msg) {
    return exp ? null : new Error(msg);
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
  };

  globalThis.SmartWeave = {
    transaction: {
      id: "oeYUgBDGBql5-ik4DJ5cDvacwmYe03jx6A5pQK7DEBw",
    },
    contract: {
      id: "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8",
    },
    contracts: {
      readContractState: () => Promise.resolve({
        balances: {
          "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8": 310000
        }
      }),
      write: (id, input) => Promise.resolve({ type: "ok" }),
    },
    block: {
      height: 1243841,
    },
  };
  console.log('jnb', state.balances['jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8'])
  const { handle } = await import("../src/index.js");
  const response = await handle(state, action);
  //console.log(JSON.stringify(response.state.balances, null, 2))
  console.log('jnb', response.state.balances['jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8'])
  assert.ok(true);
});

test.run();
