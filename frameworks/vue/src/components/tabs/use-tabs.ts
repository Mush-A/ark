import * as tabs from '@zag-js/tabs'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './tabs.types'

export interface UseTabsProps
  extends Optional<Omit<tabs.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the tabs when it is first rendered.
   * Use when you do not need to control the state of the tabs.
   */
  defaultValue?: tabs.Context['value']
  modelValue?: tabs.Context['value']
}
export interface UseTabsReturn extends ComputedRef<tabs.Api<PropTypes>> {}

export const useTabs = (props: UseTabsProps, emit: EmitFn<RootEmits>): UseTabsReturn => {
  const env = useEnvironmentContext()

  const context = computed(() => {
    const { defaultValue, modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue ?? defaultValue,
    }
  })

  const [state, send] = useMachine(
    tabs.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit('focusChange', details),
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => tabs.connect(state.value, send, normalizeProps))
}
