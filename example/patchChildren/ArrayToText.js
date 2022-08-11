// 老的是 array
// 新的是 text

import { ref, h, createTextVNode } from '../../lib/guide-mini-vue.esm.js'
const nextChildren = 'newChildren'
const prevChildren = [
  h('div', {}, 'A'),
  h('div', {}, 'B'),
  createTextVNode('您好啊')
]

export default {
  name: 'ArrayToText',
  setup() {
    const isChange = ref(false)
    window.isChange = isChange

    return {
      isChange
    }
  },
  render() {
    const self = this

    return self.isChange === true
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren)
  }
}
