import { createRenderer } from '@vue-mini/runtime-core'

function createElement(type) {
  return document.createElement(type)
}

function createText(type) {
  return document.createTextNode(type)
}

function patchProp(el, key, prevVal, nextVal) {
  const isOn = (key: string) => /^on[A-Z]/.test(key)
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase()

    if (nextVal == null) {
      // TODO 遇到的问题
      el.removeEventListener(event, prevVal)
    } else {
      el.addEventListener(event, nextVal)
    }
  } else {
    if (nextVal == null) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, nextVal)
    }
  }
}

function insert(child, parent, anchor) {
  parent.insertBefore(child, anchor || null)
}

function remove(child, parent) {
  // const parent = child.parentNode
  if (parent) {
    parent.removeChild(child)
  }
}

function setElementText(el, text) {
  el.textContent = text
}

const renderer: any = createRenderer({
  createElement,
  createText,
  patchProp,
  insert,
  remove,
  setElementText
})

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '@vue-mini/runtime-core'
