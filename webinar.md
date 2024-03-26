# Elevating Web Development: Crafting Dynamic UIs with Lit Elements and TypeScript

## 1 Introduction to Web Components

### 1.1 What are Web Components? 

> Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

(Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

```html
<button>HTML Button</button>
```

```html
<mauwi-button>Mauwi Button</mauwi-button>
```

### 1.2 Web Component Standards

#### Custom Elements

```html
<mauwi-button></mauwi-button>
<script>
  class MauwiButton extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'closed' });
      root.innerHTML = `
        <button>Mauwi Button</button>
      `;
    }
  }
  customElements.define('mauwi-button', MauwiButton);
</script>
```

```html
<mauwi-button>Custom Button</mauwi-button>
<script>
  class MauwiButton extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'closed' });
      root.innerHTML = `
        <button>Mauwi Button</button>
      `;
    }
  }
  customElements.define('mauwi-button', MauwiButton);
</script>
```

Can you guess which text "Custom Button" or "Mauwi Button" is displayed?

#### HTML Templates & Slots

```html
<mauwi-button>Mauwi Button</mauwi-button>
<script>
  class MauwiButton extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'closed' });
      root.innerHTML = `
        <button>
          <slot></slot>
        </button>
      `;
    }
  }
  customElements.define('mauwi-button', MauwiButton);
</script>
```

What if no text is provided in the custom tag?

```html
<mauwi-button></mauwi-button>
```

```html
<mauwi-button></mauwi-button>
<script>
  class MauwiButton extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'closed' });
      root.innerHTML = `
        <button>
          <slot>Default Value</slot>
        </button>
      `;
    }
  }
  customElements.define('mauwi-button', MauwiButton);
</script>
```

#### Shadow DOM

> Shadow DOM enables you to attach a DOM tree to an element, and have the internals of this tree hidden from JavaScript and CSS running in the page.

(Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

Shadow DOM provides three benefits:

- DOM scoping. DOM APIs like document.querySelector won't find elements in the component's shadow DOM, so it's harder for global scripts to accidentally break your component.
- Style scoping. You can write encapsulated styles for your shadow DOM that don't affect the rest of the DOM tree.
- Composition. The component's shadow root, which contains its internal DOM, is separate from the component's children. You can choose how children are rendered in your component's internal DOM.

(Source: https://lit.dev/docs/components/shadow-dom/)

```html
<mauwi-button></mauwi-button>
<script>
  class MauwiButton extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'closed' });
      root.innerHTML = `
      <style>
        .info { font-style: italic; }
      </style>
      <button>
        <span class="info">Info: </span>  
        <slot>Default Value</slot>
      </button>
    `;
    }
  }
  customElements.define('mauwi-button', MauwiButton);
</script>

<style>
  .info { font-weight: bold; }
</style>
<span class="info">Bold or Italic or both?</span>
```

> The mode read-only property of the ShadowRoot specifies its mode — either open or closed. This defines whether or not the shadow root's internal features are accessible from JavaScript.

(Source: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode)

```js
// mode 'closed'
document.querySelector("mauwi-button").shadowRoot // returns null

// mode 'open'
document.querySelector("mauwi-button").shadowRoot // returns shadow-root object
```

## 2 Building Web Components with Lit Elements

```js
import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

export class MauwiButton extends LitElement {
  static styles = css`.info { font-style: italic; }`;

  static properties = {
    label: {type: String},
  };

  constructor() {
    super();
    this.label = 'Default Value';
  }

  render() {
    return html`
      <button>
        <span class="info">Info: </span>  
        ${this.label}
      </button>
    `;
  }
}
customElements.define('mauwi-button', MauwiButton);
```

```html
<mauwi-button name="Mauwi Lit Button"></mauwi-button>
```

- https://lit.dev/
- [Lit Playground](https://lit.dev/playground/#sample=examples%2Fhello-world&project=W3sibmFtZSI6Im1hdXdpLWJ1dHRvbi50cyIsImNvbnRlbnQiOiJpbXBvcnQge2h0bWwsIGNzcywgTGl0RWxlbWVudH0gZnJvbSAnbGl0JztcbmltcG9ydCB7Y3VzdG9tRWxlbWVudCwgcHJvcGVydHl9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcblxuQGN1c3RvbUVsZW1lbnQoJ21hdXdpLWJ1dHRvbicpXG5leHBvcnQgY2xhc3MgTWF1d2lCdXR0b24gZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgc3RhdGljIHN0eWxlcyA9IGNzc2AuaW5mbyB7IGZvbnQtc3R5bGU6IGl0YWxpYzsgfWA7XG5cbiAgQHByb3BlcnR5KClcbiAgbGFiZWw6IHN0cmluZyA9ICdEZWZhdWx0IFZhbHVlJztcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgPGJ1dHRvbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvXCI-SW5mbzogPC9zcGFuPiAgXG4gICAgICAgICR7dGhpcy5sYWJlbH1cbiAgICAgIDwvYnV0dG9uPmA7XG4gIH1cbn1cbiJ9LHsibmFtZSI6ImluZGV4Lmh0bWwiLCJjb250ZW50IjoiPCFET0NUWVBFIGh0bWw-XG48aGVhZD5cbiAgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiLi9tYXV3aS1idXR0b24uanNcIj48L3NjcmlwdD5cbjwvaGVhZD5cbjxib2R5PlxuICA8bWF1d2ktYnV0dG9uIGxhYmVsPVwiTWF1d2kgTGl0IEJ1dHRvblwiPjwvc2ltcGxlLWdyZWV0aW5nPlxuPC9ib2R5PlxuIn0seyJuYW1lIjoicGFja2FnZS5qc29uIiwiY29udGVudCI6IntcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibGl0XCI6IFwiXjMuMC4wXCIsXG4gICAgXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnRcIjogXCJeMi4wLjBcIixcbiAgICBcImxpdC1lbGVtZW50XCI6IFwiXjQuMC4wXCIsXG4gICAgXCJsaXQtaHRtbFwiOiBcIl4zLjAuMFwiXG4gIH1cbn0iLCJoaWRkZW4iOnRydWV9XQ)

Features:

- Extends from LitElement class
- css imported from Lit (Scoped styles)
- tagged template literals (Declarative templates)

#### Lit Elements with TypeScript 

```ts
import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('mauwi-lit-button')
export class MauwiButton extends LitElement {
  static styles = css`.info { font-style: italic; }`;

  @property({ type: String })
  label = 'Default Value';

  render() {
    return html`
      <button>
        <span class="info">Info: </span>
        ${this.label}
      </button>
    `;
  }
}
```

Features:

- @customElement() decorator (Custom Elements)
- @property() decorator (Reactive properties)
- [TypeScript](https://www.typescriptlang.org/)

#### Events

https://stackblitz.com/edit/vitejs-vite-f8esni?file=src%2Fmauwi-button.ts

## 3 TailwindCSS

> A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup.

(Source: https://tailwindcss.com/)

mauwi-wc Repository

- [mauwi-tabs](https://github.com/mauricewipf/mauwi-wc/blob/main/src/tabs/tabs.ts)
- [tailwind.element.ts](https://github.com/mauricewipf/mauwi-wc/blob/main/src/shared/tailwind.element.ts)

## 4 Storybook

https://www.mauwi.me/mauwi-wc/?path=/story/components-tabs--small-screen

## 5 Sharing and distributing Web Components

### 5.1 CDN

```html
<script type="module" src="https://unpkg.com/@mauwi-org/mauwi-wc/dist/entry-index.js"></script>

<mauwi-calendar></mauwi-calendar>
```

### 5.2 Publish on NPM or Yarn

https://www.npmjs.com/package/@mauwi-org/mauwi-wc

```shell
npm install @mauwi-org/mauwi-wc
```

```html
<mauwi-calendar></mauwi-calendar>
```

## 6 Q&A
