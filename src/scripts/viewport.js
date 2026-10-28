// 컨테이너의 가로·세로 중 더 제한적인 쪽에 맞춰 정사각형 칸을 유지합니다.
export function mountViewport(signal) {
  const listen = (target, type, handler) => target.addEventListener(type, handler, { signal });
  const observers = [];
  const container = document.querySelector(".battlefield-viewport");
  const board = document.getElementById("battlefield");
  function fitBoard() {
    const style = getComputedStyle(board);
    const columns = Number(style.getPropertyValue("--columns")) || 12;
    const rows = Number(style.getPropertyValue("--rows")) || 8;
    const cell = Math.max(0, Math.min((container.clientWidth - 4) / columns, (container.clientHeight - 4) / rows));
    board.style.width = `${cell * columns}px`;
    board.style.height = `${cell * rows}px`;
    // 겹침 레이어도 실제 맵의 경계에 맞추되, 맵 크기를 결정하지는 않습니다.
    container.parentElement.style.setProperty("--board-width", `${cell * columns}px`);
    container.parentElement.style.setProperty("--board-height", `${cell * rows}px`);
  }
  const resizeObserver = new ResizeObserver(fitBoard);
  resizeObserver.observe(container);
  observers.push(resizeObserver);
  listen(window, "resize", fitBoard);
  if (window.visualViewport) listen(window.visualViewport, "resize", fitBoard);
  fitBoard();

  // 생략된 긴 상태 메시지는 마우스를 올려서도 전체 내용을 확인할 수 있습니다.
  for (const id of ["operation-status", "deployment-status", "combat-status", "selection-detail", "unit-stats"]) {
    const element = document.getElementById(id);
    const update = () => { element.title = element.textContent; };
    const observer = new MutationObserver(update);
    observer.observe(element, { childList: true, subtree: true, characterData: true });
    observers.push(observer);
    update();
  }
  const help = document.getElementById("help-dialog");
  listen(document.getElementById("help-button"), "click", () => {
    document.getElementById("help-state").textContent = ["operation-status", "selected-unit-name", "selection-detail", "unit-stats", "deployment-status", "combat-status"].map(id => document.getElementById(id).textContent).join("\n");
    help.showModal();
  });
  listen(document.getElementById("help-close"), "click", () => help.close());
  return () => observers.forEach(observer => observer.disconnect());
}
