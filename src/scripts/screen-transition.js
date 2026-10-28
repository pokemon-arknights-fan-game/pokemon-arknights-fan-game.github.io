// 전환 효과의 수명은 데이터 요청과 분리합니다. 새 전환이 이전 효과를 취소할 수 있습니다.
export function createScreenTransition(element) {
  let animation = null;
  let generation = 0;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  async function fade(opacity, duration) {
    const from = element.hidden ? "0" : getComputedStyle(element).opacity;
    animation?.cancel();
    element.hidden = false;
    animation = element.animate([{ opacity: from }, { opacity }], {
      duration: reducedMotion.matches ? 0 : duration,
      easing: "ease-in-out", fill: "forwards",
    });
    try { await animation.finished; } catch { /* 새 전환에 의한 취소는 정상 흐름입니다. */ }
  }
  return {
    cover() {
      generation += 1;
      return fade("1", 180);
    },
    async reveal() {
      const ticket = ++generation;
      await fade("0", 220);
      if (ticket === generation) {
        element.hidden = true;
        animation?.cancel();
        animation = null;
      }
    },
  };
}
