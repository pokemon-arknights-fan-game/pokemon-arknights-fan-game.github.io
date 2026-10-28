// 이전 개별 화면 주소로 접근해도 공통 문서의 해당 화면으로 이동합니다.
(() => {
  const screen = document.documentElement.dataset.screen;
  location.replace(screen === "battle" ? "./index.html#battle" : "./index.html#lobby");
})();
