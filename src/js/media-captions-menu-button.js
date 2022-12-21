import './media-chrome-menu-button.js';
import './media-captions-listbox.js';
import { MediaUIAttributes, MediaStateReceiverAttributes } from './constants.js';
import { window, document, } from './utils/server-safe-globals.js';

const ccEnabledIcon = `
<svg class="enabled" slot="button-content" aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`;

const ccDisabledIcon = `
<svg class="disabled" slot="button-content" aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;

const template = document.createElement('template');

template.innerHTML = `
<style>
  :host,
  media-chrome-menu-button {
    display: contents;
  }

  media-captions-listbox {
    position: absolute;
    bottom: 44px;
    width: 100px;
    max-height: 300px;
    overflow: auto;
  }
  :host([media-controller]) media-captions-listbox {
    z-index: 1;
    bottom: unset;
  }

  /*
   * if no captions selected, enabled icon should be hidden
   * if captions selected, the disabled icon should be hidden
   */
  media-chrome-menu-button:not(.enabled) .enabled,
  media-chrome-menu-button.enabled .disabled {
    display: none;
  }
  /*
   * if captions selected, enabled icon should be shown
   * if no captions selected, disabled icon should be shown
   */
  media-chrome-menu-button.enabled .enabled {
  media-chrome-menu-button:not(.enabled) .disabled {
    display: initial;
  }
</style>

<media-chrome-menu-button aria-label="captions menu button">
  ${ccEnabledIcon}
  ${ccDisabledIcon}
  <media-captions-listbox slot="listbox"></media-captions-listbox>
</media-chrome-menu-button>
`;

/**
 * @extends {HTMLElement}
 */
class MediaCaptionsMenuButton extends window.HTMLElement {
  #menuButton;
  /** @type {HTMLElement} */
  #listbox;
  #handleClick;

  static get observedAttributes() {
    return [
      'disabled',
      MediaStateReceiverAttributes.MEDIA_CONTROLLER,
      MediaUIAttributes.MEDIA_CAPTIONS_SHOWING,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING,
    ];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const mediaCaptionsMenuButton = template.content.cloneNode(true);
    this.nativeEl = mediaCaptionsMenuButton;

    shadow.append(mediaCaptionsMenuButton);

    this.#menuButton = this.shadowRoot.querySelector('media-chrome-menu-button');
    this.#listbox = this.#menuButton.querySelector('media-captions-listbox');

    this.#handleClick = this.#handleClick_.bind(this);
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        const mediaControllerEl = document.getElementById(oldValue);
        mediaControllerEl?.unassociateElement?.(this);
      }
      if (newValue) {
        const mediaControllerEl = document.getElementById(newValue);
        mediaControllerEl?.associateElement?.(this);
      }
    } else if (
      attrName === MediaUIAttributes.MEDIA_CAPTIONS_SHOWING ||
      attrName === MediaUIAttributes.MEDIA_SUBTITLES_SHOWING &&
      newValue !== oldValue
    ) {
      if (newValue) {
        this.#captionsEnabled();
      } else {
        this.#captionsDisabled();
      }
    } else if (attrName === 'disabled' && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }


  #handleClick_() {
    this.#updateMenuPosition();
  }

  #updateMenuPosition() {
    const svgs = this.shadowRoot.querySelectorAll('svg');
    const onSvgRect = svgs[0].getBoundingClientRect();
    const offSvgRect = svgs[1].getBoundingClientRect();

    if (this.hasAttribute('media-controller')) {
      const widthOn = onSvgRect.width;
      const widthOff = offSvgRect.width;
      const width = widthOn > 0 ? widthOn : widthOff > 0 ? widthOff : 0;
      const heightOn = onSvgRect.height;
      const heightOff = offSvgRect.height;
      const height = heightOn > 0 ? heightOn : heightOff > 0 ? heightOff : 0;

      this.#listbox.style.marginLeft = `calc(-${width}px - 10px * 2)`;
      this.#listbox.style.marginTop = `calc(${height}px + 10px * 2)`;

    } else {
      const xOn = onSvgRect.x;
      const xOff = offSvgRect.x;
      const leftOffset = xOn > 0 ? xOn : xOff > 0 ? xOff : 0;
      const parentOffset = (this.parentElement ?? this).getBoundingClientRect().x;

      this.#listbox.style.marginLeft = `calc(${leftOffset}px - ${parentOffset}px - 10px)`;
    }
  }

  #captionsEnabled() {
    this.#menuButton.classList.add('enabled');
  }
  #captionsDisabled() {
    this.#menuButton.classList.remove('enabled');
  }

  enable() {
    this.addEventListener('click', this.#handleClick);
  }
  disable() {
    this.removeEventListener('click', this.#handleClick);
  }

  connectedCallback() {
    if (!this.hasAttribute('disabled')) {
      this.enable();
    }

    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      const mediaControllerEl = document.getElementById(mediaControllerId);
      mediaControllerEl?.associateElement?.(this);
    }
  }

  disconnectedCallback() {
    this.disable();

    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      const mediaControllerEl = document.getElementById(mediaControllerId);
      mediaControllerEl?.unassociateElement?.(this);
    }
  }

  get keysUsed() {
    return ['Enter', ' ', 'ArrowUp', 'ArrowDown'];
  }
}

if (!window.customElements.get('media-captions-menu-button')) {
  window.customElements.define('media-captions-menu-button', MediaCaptionsMenuButton);
}

export default MediaCaptionsMenuButton;
