<template>
  <div class="chatgpt-panel" :class="[collapsed ? 'collapsed' : '']">
    <div class="search">
      <div class="history">
        <div class="tip" v-if="historyTopics.length">最近搜索：</div>
        <div v-for="(topic, i) in historyTopics" :key="i">
          <div class="history-topic">
            <div class="text">{{ topic.text }}</div>
            <div class="state">
              <LoadingOutlined v-if="topic.state === 0" />
              <CheckOutlined v-else-if="topic.state === 1" />
              <CloseOutlined v-else />
            </div>
          </div>
        </div>
      </div>
      <div class="prompts-container">
        <div className="tip">快速试试：</div>
        <div class="prompts">
          <div :class="['prompt', current?.state === 0 ? 'disabled' : '']" @click="tryPrompt">如何快速学习一门知识</div>
          <div :class="['prompt', current?.state === 0 ? 'disabled' : '']" @click="tryPrompt">如何进行需求的评审</div>
          <div :class="['prompt', current?.state === 0 ? 'disabled' : '']" @click="tryPrompt">如何变成奥特曼</div>
          <div :class="['prompt', current?.state === 0 ? 'disabled' : '']" @click="tryPrompt">如何评价三体小说</div>
        </div>
      </div>
      <InputSearch
        v-model:value="topicText"
        class="topic-search-input"
        :loading="current?.state === 0"
        :disabled="current?.state === 0"
        placeholder="请一句话描述题目（例如，如何克服焦虑）"
        @search="onSearch"
      />
    </div>
    <div class="toggle" @click="togglePanel">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 96 16"
        width="96"
        height="16"
        fill="none"
      >
        <path class="Axi_6A" d="M0 16v-4c20 0 12-12 32-12h32c20 0 12 12 32 12V16z" fill="#fff"></path>
        <path class="zl9Kag" d="M0 12.5c20 0 12-12 32-12h32c20 0 12 12 32 12"  stroke="rgba(57, 76, 96, 0.15)"></path>
      </svg>
      <LeftOutlined class="left-arrow" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
  LeftOutlined
} from '@ant-design/icons-vue'
import { Input, message } from 'ant-design-vue'
import {useSlidesStore } from '@/store'
import { generateSlides } from '@/api/index'

const InputSearch = Input.Search

interface Topic {
  text: string
  // 0 => 加载中 1 => 加载成功 2 => 加载失败
  state: number
}
const historyTopics = ref<Topic[]>([])
const current = ref<Topic | null>(null)
const collapsed = ref(false)
const topicText = ref('')
const slidesStore = useSlidesStore()
const makeTopic = (text: string): Topic => {
  return reactive({ text, state: 0 })
}

const tryPrompt = async (event: Event) => {
  await onSearch((event.target as HTMLDivElement).innerText)
}

const onSearch = async (value: string) => {
  if (!value) {
    return
  }
  topicText.value = ''
  const topic = makeTopic(value)
  slidesStore.setCurrentTopic(topic)
  historyTopics.value.push(topic)
  current.value = topic
  try {
    const { errCode, slides, errMessage } = await generateSlides(value)
    if (errCode) {
      topic.state = 2
      message.error(errMessage)
      return
    }
    topic.state = 1
    slidesStore.setSlides(slides)
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    topic.state = 2
  }
}
const togglePanel = () => {
  collapsed.value = !collapsed.value
}
</script>

<style lang="scss" scoped>
.chatgpt-panel {
  position: relative;
  width: 320px;
  height: 100%;
  border-right: solid 1px rgba(57, 76, 96, 0.15);
  transition: width 0.3s;
  .search {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 12px;
    overflow-y: scroll;
  }
  .history {
    .tip {
      margin-bottom: 12px;
      font-size: 12px;
    }
    .history-topic {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 8px;
      line-height: 22px;
      width: fit-content;
      padding: 6px 12px;
      border-radius: 2px;
      border: solid 1px #eee;
      .text {
        flex: 1;
        word-break: break-all;
      }
      .state {
        flex-shrink: 0;
        margin-left: 8px;
      }
    }
  }
  .prompts-container {
    position: absolute;
    left: 12px;
    bottom: 80px;
    width: calc(100% - 24px);
    font-size: 12px;
    .tip {
      margin-bottom: 12px;
    }
    .prompts {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      .prompt {
        margin-bottom: 12px;
        width: 140px;
        height: 28px;
        line-height: 28px;
        border-radius: 2px;
        text-align: center;
        border: solid 1px #eee;
        &:hover {
          transform: scale(1.08);
          cursor: pointer;
        }
        &.disabled {
          pointer-events: none;
        }
      }
    }
  }
  .topic-search-input {
    position: absolute;
    left: 12px;
    bottom: 12px;
    width: calc(100% - 24px);
    height: 32px;
    box-sizing: border-box;
  }
  .toggle {
    position: absolute;
    top: 50%;
    right: -52px;
    transform: translateY(-50%) rotate(90deg);
    &:hover {
      cursor: pointer;
    }
    .left-arrow {
      position: absolute;
      left: 50%;
      top: 50%;
      color: rgba(57, 76, 96, 0.4);
      transform: translate(-50%, -50%) rotate(-90deg);
    }
  }
  &.collapsed {
    width: 0;
    .search {
      display: none;
    }
    .toggle .left-arrow {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
}

</style>
