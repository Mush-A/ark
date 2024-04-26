import * as segmentGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseSegmentGroupProps
  extends Optional<Omit<segmentGroup.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the segment group.
   */
  defaultValue?: segmentGroup.Context['value']
}

export interface UseSegmentGroupReturn extends segmentGroup.Api<PropTypes> {}

export const useSegmentGroup = (props: UseSegmentGroupProps): UseSegmentGroupReturn => {
  const initialContext: segmentGroup.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: segmentGroup.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }

  const [state, send] = useMachine(segmentGroup.machine(initialContext), {
    context,
  })

  return segmentGroup.connect(state, send, normalizeProps)
}
