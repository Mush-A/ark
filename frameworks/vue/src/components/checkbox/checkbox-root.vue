<script lang="ts">
import type { RootEmits, RootProps } from './checkbox.types'

export interface CheckboxRootProps extends RootProps, PolymorphicProps {}
export interface CheckboxRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useCheckbox } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  checked: undefined,
  defaultChecked: undefined,
})
const emits = defineEmits<CheckboxRootEmits>()

const checkbox = useCheckbox(props, emits)
CheckboxProvider(checkbox)
</script>

<template>
  <ark.label v-bind="checkbox.rootProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
