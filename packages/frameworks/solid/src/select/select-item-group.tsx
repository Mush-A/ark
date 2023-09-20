import type { ItemGroupProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectItemGroupProps = Assign<HTMLArkProps<'div'>, ItemGroupProps>

export const SelectItemGroup = (props: SelectItemGroupProps) => {
  const [groupProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['id'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemGroupProps(groupProps), localProps)

  return <ark.div {...mergedProps} />
}