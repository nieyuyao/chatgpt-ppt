<template>
  <div class="empty-panel">
    <div class="content">
      <span class="text">
        {{ currentTopic && currentTopic.state === 0 ? '加载中' : '请在左侧输入内容' }}
      </span>
      👋🏻
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSlidesStore } from '@/store'

const slidesStore = useSlidesStore()
const currentTopic = computed(() => slidesStore.currentTopic)
</script>

<style lang="scss" scoped>
.empty-panel {
  flex: 1 1;
  background-color: #ebecf0;
  .content {
    margin: 100px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 100px);
    height: calc(100% - 200px);
    font-size: 32px;
    color: rgba(0, 0, 0, 0.8);
    background-color: #fff;
    .text {
      background-image: linear-gradient(to left, #ccc, #333 25%, #ccc 50%, #333 75%, #ccc);
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 100%;
      animation: masked-animation 4s infinite linear;
      @keyframes masked-animation {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
    }
  }
}

</style>
