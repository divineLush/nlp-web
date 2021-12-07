class Token extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <span>
                <slot></slot>
            </span>
        `
    }
}

window.customElements.define('app-token', Token)
