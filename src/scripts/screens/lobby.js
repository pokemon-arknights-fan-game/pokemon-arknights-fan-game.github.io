export function mount() {
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const dialog = document.getElementById("card-menu-dialog");
  const open = document.getElementById("open-card-menu");
  open.addEventListener("click", () => { if (!dialog.open) dialog.showModal(); }, options);
  document.getElementById("close-card-menu").addEventListener("click", () => dialog.close(), options);
  // 메뉴 선택 시 즉시 모달을 닫아 다음 화면의 전환 효과를 가리지 않게 합니다.
  dialog.addEventListener("click", event => {
    if (event.target.closest("a[href]")) dialog.close();
    else if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  }, options);
  return () => {
    controller.abort();
    if (dialog.open) dialog.close();
  };
}
