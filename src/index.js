import { addPair } from "./write/add-pair.js";
import { CreateOrder } from "./write/create-order.js";
import { CancelOrder } from "./write/cancel-order.js";
import { balance } from "./read/balance.js";
import { transfer } from "./write/transfer.js";
import { validate } from "./read/validate.js";
import { allow } from "./write/allow.js";
import { claim } from "./write/claim.js";
import { buyback } from "./cron/buyback.js";
import { reward } from "./cron/reward.js";
import { cancelClaim } from './write/cancel-claim.js';
import { contributorMint } from './write/contributor-mint.js'
import { contributorChg } from './write/contributor-chg.js'
import { evolve } from './write/evolve.js'

const identity = x => x

export async function handle(state, action) {
  async function CreateOrderPlusBuyback(state, action) {
    const result = await CreateOrder(state, action)
    // do non U, buyback here
    // look for orders that U is for sell, for Token
    // if there is, then try to trade via createOrder
    return result
  }

  validate(state);
  state = reward(state);
  // do buyback
  if (action.input.function === "createOrder" && !action.input.price) {
    state = await buyback(state);
  }
  switch (action?.input?.function) {
    case "noop":
      return { state };
    case "addPair":
      return addPair(state, action).extract();
    case "createOrder":
      return CreateOrderPlusBuyback(state, action);
    case "cancelOrder":
      return CancelOrder(state, action);
    case "cancelClaim":
      return cancelClaim(state, action);
    case "balance":
      return balance(state, action);
    case "transfer":
      return transfer(state, action).fold(handleError, identity);
    case "allow":
      return allow(state, action).fold(handleError, identity);
    case "claim":
      return claim(state, action).fold(handleError, identity);
    case "contributorMint":
      return contributorMint(state, action).fold(handleError, identity);
    case "contributorChg":
      return contributorChg(state, action).fold(handleError, identity);
    case "evolve":
      return evolve(state, action)
    default:
      throw new ContractError("No Function Found");
  }
}

function handleError(msg) {
  throw new ContractError(msg);
}
