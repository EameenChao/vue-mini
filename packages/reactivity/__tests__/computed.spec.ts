import { computed } from '../src/computed'
import { reactive } from '../src/reactive'

describe('computed', () => {
  it('happy path', () => {
    const user = reactive({
      age: 1
    })

    const age = computed(() => {
      return user.age
    })

    expect(age.value).toBe(1)
  })

  it('should compute lazily', () => {
    const value = reactive({
      foo: 1
    })
    const getter = jest.fn(() => {
      return value.foo
    })
    const cValue = computed(getter)

    // lazy
    expect(getter).not.toHaveBeenCalled()

    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    // should not compute again
    cValue.value // get
    expect(getter).toHaveBeenCalledTimes(1)

    // should not compute until needed
    // TODO 遇到的问题，应该触发出发 getter
    value.foo = 2
    value.foo = 3
    expect(getter).toHaveBeenCalledTimes(1)

    // now it should compute
    expect(cValue.value).toBe(3)
    expect(getter).toHaveBeenCalledTimes(2)

    // should not compute again
    cValue.value
    expect(getter).toHaveBeenCalledTimes(2)
  })
})
