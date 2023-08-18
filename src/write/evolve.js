const EVOLVE_WINDOW = 720 * 180

export function evolve(state, action) {
  if (state.canEvolve && Number(SmartWeave.block.height) < state.originHeight + EVOLVE_WINDOW) {
    if (SmartWeave.contract.owner === action.caller) {
      state.evolve = action.input.value;
    }
  }
  return { state };
}
