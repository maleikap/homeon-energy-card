/* HOMEON 0.2.44 SAFE LEGACY LOADER
   This file intentionally does not declare the old HomeOnEnergyCard class.
   It prevents CustomElementRegistry duplicate-constructor errors and loads v0.2.44.
*/
(() => {
  const legacyTag = "homeon-energy-card";
  const newTag = "homeon-energy-card-v044";
  const newScript = "/hacsfiles/homeon-energy-card/homeon-energy-card-v044.js?v=044";

  function ensureV044Loaded() {
    if (window.customElements.get(newTag)) return;

    const existing = Array.from(document.scripts || []).some((script) =>
      String(script.src || "").includes("homeon-energy-card-v044.js")
    );

    if (existing) return;

    const script = document.createElement("script");
    script.src = newScript;
    script.async = false;
    script.onload = () => console.info("HomeOn Energy Card 0.2.44 script loaded");
    script.onerror = () => console.warn("HomeOn Energy Card 0.2.44 script load failed:", newScript);
    document.head.appendChild(script);
  }

  if (window.customElements.get(legacyTag)) {
    console.info("HomeOn legacy tag already registered, safe loader skipped");
    ensureV044Loaded();
    return;
  }

  class HomeOnEnergyCardLegacyProxy extends HTMLElement {
    setConfig(config) {
      this._config = config || {};
      this._render();
    }

    set hass(hass) {
      this._hass = hass;
      this._render();
    }

    getCardSize() {
      return 12;
    }

    _render() {
      ensureV044Loaded();

      const NewCard = window.customElements.get(newTag);

      if (!NewCard) {
        this.innerHTML = `
          <ha-card>
            <div style="padding:16px;font-family:var(--primary-font-family);">
              <h3 style="margin:0 0 8px;">HomeOn Energy Card 0.2.44</h3>
              <div>Ładuję nową kartę operatora...</div>
              <div style="opacity:.75;margin-top:8px;">
                Jeżeli ten komunikat zostaje dłużej, dodaj zasób:
                /hacsfiles/homeon-energy-card/homeon-energy-card-v044.js?v=044
              </div>
            </div>
          </ha-card>
        `;
        window.setTimeout(() => this._render(), 800);
        return;
      }

      if (!this._child || this._child.tagName.toLowerCase() !== newTag) {
        this.innerHTML = "";
        this._child = document.createElement(newTag);
        this.appendChild(this._child);
        if (this._config && this._child.setConfig) {
          this._child.setConfig(this._config);
        }
      }

      if (this._hass) {
        this._child.hass = this._hass;
      }
    }
  }

  try {
    window.customElements.define(legacyTag, HomeOnEnergyCardLegacyProxy);
    console.info("HomeOn Energy Card 0.2.44 legacy proxy loaded");
  } catch (err) {
    console.warn("HomeOn legacy proxy registration skipped safely:", err);
  }

  ensureV044Loaded();
})();
