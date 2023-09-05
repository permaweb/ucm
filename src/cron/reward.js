import { allocate } from "../lib/allocate.js";
import { sum, values, keys, assoc } from "ramda";
// We need to evaluate STREAK Object adding points multiplier
// create distribution object
// identify the REWARD via halving cycle
// feed distribution object in to allocate function
// only vouched address

const DAY = 720;
const TOTAL_SUPPLY = 26_280_000 * 1e6;
const HALVING_SUPPLY = TOTAL_SUPPLY * .9;
const ORIGIN_HEIGHT = 1232228;
const CYCLE_INTERVAL = DAY * 365; // 1 year

// reward streaks
export function reward(state, vouched) {

  if (Number(state.lastReward) + DAY >= Number(SmartWeave.block.height)) {
    return state;
  }
  if (keys(state.streaks).length < 1) {
    return state;
  }
  const { reward } = setReward(Number(SmartWeave.block.height))({ state });

  if (reward === 0) {
    return state; // do not run mint
  }

  state.streaks = keys(state.streaks).reduce((a, k) => {
    if (state.streaks[k].lastHeight > (Number(SmartWeave.block.height) - (DAY * 2))) {
      return { ...a, [k]: state.streaks[k] }
    }
    return a
  }, {})
  // if no streaks not reward
  if (keys(state.streaks).length === 0) {
    return state
  }

  const streaks = assignPoints(state.streaks);
  // console.log(streaks)
  // filter to vouched streaks
  const vouchedStreaks = rewardVouched(streaks, vouched)
  // allocate reward
  state.recentRewards = allocate(vouchedStreaks, reward);
  // update balances
  state = updateBalances({ state, rewards: state.recentRewards });
  // set lastReward
  state.lastReward = SmartWeave.block.height;
  return state;
}

function rewardVouched(streaks, vouched) {
  return keys(streaks).reduce((a, k) => {
    if (vouched.includes(k)) {
      return assoc(k, streaks[k], a)
    } else {
      return a
    }
  }, {})
}

function assignPoints(streaks) {
  return keys(streaks).reduce((a, k) => {
    if (streaks[k].days > 0 && streaks[k].days < 31) {
      const multiplier = streaks[k].days - 1;
      return assoc(k, 1 + multiplier * 0.1, a);
    } else if (streaks[k].days >= 31) {
      const multiplier = 30;
      return assoc(k, 1 + multiplier * 0.1, a);
    } else {
      return a;
    }
  }, {});
}

function setReward(height) {
  return ({ state }) => {
    const S100 = 1 * 1e6;

    const current = sum(values(state.balances)) || 0;

    if (current >= HALVING_SUPPLY) {
      if (!state.balances[contractId]) {
        state.balances[contractId] = 0;
      }
      return 0;
    }
    const reward = getReward(
      HALVING_SUPPLY,
      CYCLE_INTERVAL,
      height,
      ORIGIN_HEIGHT
    );
    return { state, reward };
  };
}

function updateBalances({ state, rewards }) {
  keys(rewards).forEach((k) => {
    if (!state.balances[k]) {
      state.balances[k] = 0;
    }
    state.balances[k] += rewards[k];
  });
  return state;
}

function getReward(supply, interval, currentHeight, originHeight) {
  const blockHeight = currentHeight - originHeight;
  const currentCycle = Math.floor(blockHeight / interval) + 1;
  const divisor = Math.pow(2, currentCycle);
  const reward = Math.floor(Math.floor(supply / divisor) / 365);
  // Debug
  // console.log({ supply, interval, currentHeight, originHeight })
  // console.log('blockHeight', blockHeight)
  // console.log('current cycle', currentCycle)
  // console.log('divisor', divisor)
  // console.log('reward', reward)
  return reward;
}
