import type { Config, State } from "../state"

export function save(state: State, config: Config) {
  state.config = config
}
