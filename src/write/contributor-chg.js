import { of, Right, Left } from '../lib/either.js'
import { dissoc, clone, not, path, assoc } from 'ramda'

export function contributorChg(state, action) {
  // ContractAssert(action.input.tier, "Tier is required")
  // ContractAssert(action.input.target, "Target is required")

  // const members = clone(state.contributors.tiers[action.input.tier].members)
  // members[action.input.target] = members[action.caller]
  // members = dissoc(action.caller, members)
  // state.contributors.tiers[action.input.tier].members = members

  return of({ state, action })
    .chain(validate)
    .map(cloneMembers)
    .map(setTarget)
    .map(dissocCaller)
    .map(attachMembers)

}

function attachMembers(ctx) {
  ctx.state.contributors.tiers[ctx.tier].members = ctx.members
  return { state: ctx.state }
}

function dissocCaller(ctx) {
  ctx.members = dissoc(ctx.caller, ctx.members)
  return ctx
}

function setTarget(ctx) {
  ctx.members = assoc(ctx.target, ctx.members[ctx.caller], ctx.members)
  return ctx
}

function cloneMembers(ctx) {
  return { ...ctx, members: clone(path(['contributors', 'tiers', ctx.tier, 'members'], ctx.state)) }
}

function validate({ state, action }) {
  if (not(action.input.tier)) {
    return Left("Tier Input is required")
  }
  if (not(action.input.target)) {
    return Left("Target Input is required")
  }

  return Right({
    state,
    caller: action.caller,
    tier: action.input.tier,
    target: action.input.target
  })
}