import { test } from "uvu";
import * as assert from "uvu/assert";

const U = "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw";
const PIXL = "tfalT8Z-88riNtoXdF5ldaBtmsfcSmbMqWLh2DHJIbg";

test("buy order", async () => {
  globalThis.ContractAssert = function (expr, msg) {
    if (!expr) {
      throw new Error(msg);
    }
  };

  globalThis.ContractError = function (msg) {
    return new Error(msg);
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
      readContractState(id) {
        if (id === U) {
          return Promise.resolve({
            balances: {
              "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8": 5799000000 * 2,
            },
          });
        }
        const VOUCH_DAO = "_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk"
        if (id === VOUCH_DAO) {
          return Promise.resolve({ vouched: { '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4': 1, '1BS7nloUNSDQhpN8cMNUKIfLeTDKDXSKKsqGqPWl_Jo': 1, 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 1 } })
        }
        //console.log('readState', id)
        return Promise.resolve({});
      },
      write: (id, input) => {
        // console.log('input fn: ', input.function)
        // console.log('input target: ', input.target)
        // console.log('input qty: ', input.qty)
        // console.log('id: ', id)
        // console.log('--------')
        if (id === U && input.function === "transfer" && input.target === "5VPys2doO8c-eX2wKu07u9Fh2d_K7PtZ6pThV_K1I6s") {
          assert.equal(input.qty, 9578865);
        }
        if (id === U && input.function === "transfer" && input.target === "lLjHyfrgce3AkyAS3LWmvXfmFKFAYTWOaN0U-8t8BT4") {
          assert.equal(input.qty, 9724135);
        }
        if (id === U && input.function === "transfer" && input.target === "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4") {
          assert.equal(input.qty, 6231747188);
        }
        return Promise.resolve({ type: "ok" });
      },
    },
  };

  const { handle } = await import("../src/index.js");
  const state = {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    streaks: {},
    balances: {},
    name: "BazAR",
    ticker: "BazAR",
    pairs: [
      {
        pair: [PIXL, U],
        orders: [
          {
            "id": "dh_RyATYgEbClxXhD9hxIxy0xhpi4oLWQKoClK_OrvQ",
            "price": 0.003,
            "token": PIXL,
            "creator": "5VPys2doO8c-eX2wKu07u9Fh2d_K7PtZ6pThV_K1I6s",
            "quantity": 3209000000,
            "transfer": "INTERNAL_TRANSFER",
            "originalQuantity": 7128000000
          },
          {
            "id": "udJK0_YcfD0TOU5oVvWG67Xf3TqPGH0Lq-SFuTt7rB8",
            "price": 0.0032,
            "token": PIXL,
            "creator": "lLjHyfrgce3AkyAS3LWmvXfmFKFAYTWOaN0U-8t8BT4",
            "quantity": 5799000000,
            "transfer": "INTERNAL_TRANSFER",
            "originalQuantity": 5799000000
          },
          {
            "id": "Uom9M7aafgBF3cmkyzD1H2aMEELvU6fjq86SK4iZiFM",
            "price": 0.0034,
            "token": PIXL,
            "creator": "peFURnJVIrHJjekUXXEdFmqO707U19x5DnFsBnTeyNs",
            "quantity": 3557000000,
            "transfer": "INTERNAL_TRANSFER",
            "originalQuantity": 4221000000
          }
        ],
        priceData: {},
      },
    ],
    claimable: [],
    recentRewards: {},
    lastReward: 0,
  };

  const action = {
    caller: "9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4",
    input: {
      function: "createOrder",
      pair: [U, PIXL],
      qty: 9700000 * 2,
      //qty: (3209000000 * 0.003), // + (5799000000 * 0.32),
      transaction: "MsflN4glR9noV-DN00ygwKJZmCQS1S1ejbVRmQ5N_Nc",
    },
  };
  const response = await handle(state, action);

  //console.log(JSON.stringify(response, null, 2));
  //assert.equal(response.state.pairs[0].priceData.vwap, 100)
  assert.equal(response.result.status, "success");
  assert.ok(true);
});

test.run();
