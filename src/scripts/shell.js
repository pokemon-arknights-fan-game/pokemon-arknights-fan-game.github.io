import { mount as mountLobby } from "./screens/lobby.js";
import { mount as mountBattle } from "./screens/battle.js";

(() => {
  // 등록된 파일만 불러옵니다. 해시를 URL로 사용하지 않습니다.
  const screens = {
    lobby: { url: new URL("../screens/lobby.html", import.meta.url), label: "로비", mount: mountLobby },
    battle: { url: new URL("../screens/battle.html", import.meta.url), label: "전투 훈련", mount: mountBattle },
  };
  const host = document.getElementById("game-screen");
  const button = document.getElementById("fullscreen-button");
  const status = document.getElementById("fullscreen-status");
  let current = null;
  let cleanup = null;
  let pending = null;
  let version = 0;
  async function showScreen() {
    const requested = location.hash.slice(1) || "lobby";
    const screen = Object.hasOwn(screens, requested) ? requested : "lobby";
    if (current === screen) return;
    const ticket = ++version;
    pending?.abort();
    pending = new AbortController();
    cleanup?.();
    cleanup = null;
    current = null;
    const loading = document.createElement("p");
    loading.textContent = "화면을 불러오는 중입니다.";
    loading.setAttribute("role", "status");
    host.replaceChildren(loading);
    host.setAttribute("aria-busy", "true");
    document.getElementById("screen-label").textContent = screens[screen].label;
    try {
      const response = await fetch(screens[screen].url, { signal: pending.signal });
      if (!response.ok) throw new Error(`화면 요청 실패: ${response.status}`);
      const html = await response.text();
      if (ticket !== version) return;
      // 저장소의 고정된 HTML만 해석합니다. 사용자·외부 문자열은 넣지 않습니다.
      const template = document.createElement("template");
      template.innerHTML = html;
      document.getElementById("lobby-styles").disabled = screen !== "lobby";
      document.getElementById("battle-styles").disabled = screen !== "battle";
      host.replaceChildren(template.content);
      cleanup = screens[screen].mount();
      current = screen;
      document.title = `Pokémon × 명일방주 | ${screens[screen].label}`;
      const heading = host.querySelector("h1");
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    } catch (error) {
      if (ticket !== version || error.name === "AbortError") return;
      const message = document.createElement("p");
      message.textContent = "화면을 불러오지 못했습니다. 서버 연결과 파일 경로를 확인해 주세요.";
      message.setAttribute("role", "alert");
      const retry = document.createElement("button");
      retry.type = "button";
      retry.textContent = "다시 시도";
      retry.addEventListener("click", showScreen);
      const home = document.createElement("a");
      home.href = "#lobby";
      home.textContent = "로비로 이동";
      host.replaceChildren(message, retry, home);
    } finally {
      if (ticket === version) host.removeAttribute("aria-busy");
    }
  }
  window.addEventListener("hashchange", showScreen);
  function renderFullscreen() {
    const active = Boolean(document.fullscreenElement);
    button.textContent = active ? "전체 화면 종료" : "전체 화면";
    button.setAttribute("aria-pressed", String(active));
  }
  button.disabled = !document.fullscreenEnabled;
  if (button.disabled) status.textContent = "이 브라우저에서는 전체 화면을 지원하지 않습니다.";
  button.addEventListener("click", async () => {
    status.textContent = "";
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      status.textContent = "전체 화면을 열 수 없습니다. 브라우저 설정을 확인해 주세요.";
    }
    renderFullscreen();
  });
  document.addEventListener("fullscreenchange", renderFullscreen);
  renderFullscreen();
  showScreen();
})();
