<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface FileUploadTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

defineProps<FileUploadTriggerProps>()
const fileUpload = useFileUploadContext()
</script>

<template>
  <ark.button v-bind="fileUpload.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
