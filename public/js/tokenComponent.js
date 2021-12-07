class Token extends HTMLElement {
    constructor() {
        super()

        this.shadowRoot.innerHTML = `
            <span>
                <slot></slot>
            </span>
        `
    }
}

window.customElements.define('app-token', Token)
