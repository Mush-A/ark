import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId, useRef } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import type { RenderStrategyProps } from '../../utils/render-strategy'
import { useEvent } from '../../utils/use-event'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'>,
    RenderStrategyProps {
  /**
   * The initial open state of the collpasible.
   */
  defaultOpen?: collapsible.Context['open']
}

export interface UseCollapsibleReturn extends collapsible.Api<PropTypes> {
  /**
   * Whether the content is unmounted
   */
  isUnmounted?: boolean
}

export const useCollapsible = (props: UseCollapsibleProps = {}): UseCollapsibleReturn => {
  const { lazyMount, unmountOnExit } = props
  const wasVisible = useRef(false)

  const initialContext: collapsible.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    open: props.defaultOpen ?? props.open,
    'open.controlled': props.open !== undefined,
  }

  const context: collapsible.Context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
  }

  const [state, send] = useMachine(collapsible.machine(initialContext), { context })
  const api = collapsible.connect(state, send, normalizeProps)

  if (api.visible) {
    wasVisible.current = true
  }

  const isUnmounted =
    (!api.visible && !wasVisible.current && lazyMount) ||
    (unmountOnExit && !api.visible && wasVisible.current)

  return { ...api, isUnmounted }
}
