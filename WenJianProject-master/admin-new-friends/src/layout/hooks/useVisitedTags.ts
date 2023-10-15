import type { Ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

type VisitedTags = Ref<Array<RouteLocationNormalizedLoaded>>

export const useVisitedTags = () => {
  const route = useRoute()
  const visitedTags: VisitedTags = ref([])
  watch(
    route,
    (value) => {
      if (!visitedTags.value.find((item) => item.path === value.path)) {
        visitedTags.value.push(Object.assign({}, value))
      }
    },
    { immediate: true },
  )

  const router = useRouter()
  const setVisitedTags = (path?: any) => {
    if (Array.isArray(path)) {
      visitedTags.value = []
    } else {
      const tag = visitedTags.value.find((item) => item.path === path)
      if (tag) {
        router.push(tag)
      }
    }
  }
  return [visitedTags, setVisitedTags] as const
}
