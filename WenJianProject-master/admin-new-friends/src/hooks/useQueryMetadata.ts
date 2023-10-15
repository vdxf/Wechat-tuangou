import type { ProQueryFormMetadata } from '@/components'
import { banana } from '@daysnap/banana'
import { filterEmptyValue } from '@daysnap/utils'

export function useQueryMetadata(data: ProQueryFormMetadata) {
  const metadata = reactive(data)

  const query = ref(filterEmptyValue(banana.extract(data), true))

  return [query, metadata] as const
}
