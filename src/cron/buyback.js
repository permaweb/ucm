import { CreateOrder } from "../write/create-order.js";

export async function buyback(state) {
  const U = state.U
  const uState = await SmartWeave.contracts.readContractState(U);
  const uBalance = uState.balances[SmartWeave.contract.id] || 0;

  // validate
  if (uBalance === 0) {
    return state;
  }

  let zAR_U = state.pairs.find(
    (p) => p.pair.includes(U) && p.pair.includes(SmartWeave.contract.id)
  );

  if (!zAR_U) {
    state.pairs.push({
      pair: [SmartWeave.contract.id, U],
      orders: [],
      priceData: {},
    });
    //return state;
    zAR_U = state.pairs.find(
      (p) => p.pair.includes(U) && p.pair.includes(SmartWeave.contract.id)
    );
  }

  // if (zAR_U.orders.length === 0) {
  //   return state;
  // }

  let uInventory = zAR_U.orders.reduce((a, o) => o.price * o.quantity + a, 0);
  let response = null

  if (uInventory >= uBalance) {
    // createOrder
    // response = await CreateOrder(state, {
    //   caller: SmartWeave.contract.id,
    //   input: {
    //     pair: [U, SmartWeave.contract.id],
    //     qty: uBalance,
    //     transaction: "INTERNAL_TRANSFER",
    //   },
    // });
  } else {
    // first look and see if there are any buy orders [U, PIXL] by this contract
    const orderToUpdate = await zAR_U.orders.find(o => o.creator === SmartWeave.contract.id)

    if (orderToUpdate) {
      let price = Math.floor(orderToUpdate.price * 1.1)
      orderToUpdate.originalQuantity = Math.floor(uBalance / price)
      orderToUpdate.quantity = Math.floor(uBalance / price)
      orderToUpdate.price = Math.floor(orderToUpdate.price * 1.1)
    } else {
      let price = zAR_U?.priceData?.vwap || 100
      response = await CreateOrder(state, {
        caller: SmartWeave.contract.id,
        input: {
          pair: [U, SmartWeave.contract.id],
          qty: Math.floor(uBalance / price),
          transaction: "INTERNAL_TRANSFER",
          price
        },
      });
    }
    // first look for market price if found create a limit order at market price

    // dutch auction
  }
  if (response) {
    // burn zAR
    response.state.balances[SmartWeave.contract.id] = 0;
    if (response.result.status === "success") {
      return response.state;
    } else {
      return state;
    }
  } else {
    return state;
  }

}