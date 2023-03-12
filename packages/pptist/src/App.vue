<template>
  <div :class="['app-container', screening ? 'fullscreen' : '']">
    <Screen v-if="screening" />
    <Chatgpt v-show="!screening"/>
    <Editor v-if="currentTopic && currentTopic.state === 1" />
    <Empty v-else />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useScreenStore, useMainStore, useSlidesStore, useSnapshotStore } from '@/store'
import { LOCALSTORAGE_KEY_DISCARDED_DB } from '@/configs/storage'
import { deleteDiscardedDB } from '@/utils/database'
import Chatgpt from './views/Chatgpt/index.vue'
import Empty from './views/Chatgpt/Empty.vue'

import Editor from './views/Editor/index.vue'
import Screen from './views/Screen/index.vue'

const slidesStore = useSlidesStore()

const mainStore = useMainStore()
const snapshotStore = useSnapshotStore()
const { databaseId } = storeToRefs(mainStore)
const { screening } = storeToRefs(useScreenStore())

if (process.env.NODE_ENV === 'production') {
  window.onbeforeunload = () => false
}

const currentTopic = computed(() => slidesStore.currentTopic)

onMounted(async () => {
  await deleteDiscardedDB()
  snapshotStore.initSnapshotDatabase()
  mainStore.setAvailableFonts()
})

// 应用注销时向 localStorage 中记录下本次 indexedDB 的数据库ID，用于之后清除数据库
window.addEventListener('unload', () => {
  const discardedDB = localStorage.getItem(LOCALSTORAGE_KEY_DISCARDED_DB)
  const discardedDBList: string[] = discardedDB ? JSON.parse(discardedDB) : []

  discardedDBList.push(databaseId.value)

  const newDiscardedDB = JSON.stringify(discardedDBList)
  localStorage.setItem(LOCALSTORAGE_KEY_DISCARDED_DB, newDiscardedDB)
})
</script>

<style lang="scss">
#app {
  height: 100%;
  .app-container {
    width: 100%;
    height: 100%;
    display: flex;
    &.fullscreen {
      display: block;
    }
  }
}
</style>
