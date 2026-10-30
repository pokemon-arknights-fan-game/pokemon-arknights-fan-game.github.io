import { getSelectedDeck } from "../deck-store.js";
import { createBattle } from "../prototype.js";
import { mountViewport } from "../viewport.js";

export function mount() {
  const controller = new AbortController();
  const cleanup = [];
  const dispose = () => {
    controller.abort();
    cleanup.reverse().forEach(stop => stop());
  };
  try {
    cleanup.push(createBattle(controller.signal, getSelectedDeck()));
    cleanup.push(mountViewport(controller.signal));
    return dispose;
  } catch (error) {
    dispose();
    throw error;
  }
}
