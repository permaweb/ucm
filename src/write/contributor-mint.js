import { of, Right, Left } from '../lib/either.js'
import { allocate } from "../lib/allocate.js";

import { assoc, compose, path, reduce, map, mapObjIndexed, toPairs, head, set, lensPath } from 'ramda'

const TOTAL_SUPPLY = 26_280_000 * 1e6;
const REWARD_SUPPY = TOTAL_SUPPLY * 0.1;
const REWARD_VESTING_PERIOD = 720 * 365 * 4 // FOUR YEARS
const REWARD_UNIT_PER_HEIGHT = Math.floor(REWARD_SUPPY / REWARD_VESTING_PERIOD)

export function contributorMint(state, action) {
  const currentHeight = Number(SmartWeave.block.height)
  const originHeight = state.originHeight
  return of({
    state,
    contributor: action.caller,
    height: {
      origin: originHeight,
      current: currentHeight
    }
  })
    .chain(getContributor)
    .map(calcBlockDiff)
    .map(calcRewardAmount)
    .map(allocateForTier)
    .map(allocateForMember)
    .map(updateBalances)
    .map(setLastMint4Member)
}

function setLastMint4Member(ctx) {
  const lastMintPath = ['contributors', 'tiers', ctx.contributor.tier.name, 'members', ctx.contributor.addr, 'lastMint']
  ctx.state = set(lensPath(lastMintPath), ctx.height.current, ctx.state)
  return { state: ctx.state }
}

function updateBalances(ctx) {
  const { state } = ctx

  if (!state.balances[ctx.contributor.addr]) {
    state.balances[ctx.contributor.addr] = 0
  }
  state.balances[ctx.contributor.addr] += ctx.rewardMember

  return assoc('state', state, ctx)
}



function allocateForMember(ctx) {
  // use allocate function
  const members = ctx.state.contributors.tiers[ctx.contributor.tier.name].members
  const table = reduce((acc, [key, value]) => assoc(key, value.amount, acc), {}, toPairs(members))
  const reward = allocate(table, ctx.rewardTier)

  return assoc('rewardMember', reward[ctx.contributor.addr], ctx)
}

function allocateForTier(ctx) {
  const { contributor, reward } = ctx
  const rewardTier = Math.floor(reward * (contributor.tier.percent / 100))
  return assoc('rewardTier', rewardTier, ctx)
}

function calcRewardAmount(ctx) {
  const { height } = ctx
  const reward = height.diff * REWARD_UNIT_PER_HEIGHT
  return assoc('reward', reward, ctx)
}

function calcBlockDiff(ctx) {
  const height = ctx.height
  const contributor = ctx.contributor
  const start = contributor.lastMint === 0 ? height.origin : contributor.lastMint
  const diff = height.current - start
  return assoc('height', { ...height, diff }, ctx)
}

function getContributor({ state, contributor, height }) {
  return compose(
    c => c ? Right({ state, contributor: c, height }) : Left('could not find'),
    head,
    map(m => m[contributor]),
    tiers => {
      const members = reduce((a, [tierName, tierValue]) => {
        const o = mapObjIndexed((d, k) => {
          return ({ ...d, tier: { name: tierName, percent: tierValue.percent }, addr: k })
        }, tierValue.members)
        return a.concat(o)
      }, [], toPairs(tiers))

      return members
    },
    path(['contributors', 'tiers'])
  )(state)
}
