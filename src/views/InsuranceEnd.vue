<script setup lang="ts">
import MainCard from '../components/MainCard.vue'
import {
  NIcon,
  NInput,
  NUpload,
  NButton,
  NDivider,
  type UploadCustomRequestOptions
} from 'naive-ui'
import { DocumentAttachOutline, PencilOutline } from '@vicons/ionicons5'
import { ref, computed, watch } from 'vue'
import { globalStore } from '../stores/index'
const texts = ['start to validate', 'validate success', 'validate fail']
const inputAddress = ref('')
const contractAddress = ref()

const buttonText = ref(texts[0])
const getAddress = () => {
  //@ts-ignore
  contractAddress.value = localStorage.getItem(inputAddress.value) || ''
}

watch(
  () => inputAddress.value,
  () => {
    buttonText.value = texts[0]
  }
)
const handleClickValidate = () => {
  setTimeout(() => {
    if (contractAddress.value) {
      buttonText.value = texts[1]
    } else {
      buttonText.value = texts[2]
    }
  })
}
</script>
<template>
  <div
    class="demo-header"
  >Blockchain-based privacy protection mechanism for electronic health records</div>
  <main>
    <MainCard title="Insurance Company">
      <template v-slot:top>
        <div class="sub-head">
          <NIcon :component="PencilOutline" size="30" :depth="2" />
          <span class="sub-head-text">1) Enter the patient's ethereum address</span>
        </div>
        <div class="sub-content">
          <NInput v-model:value="inputAddress"></NInput>
          <div style="text-align: center; padding-top: 20px">
            <NButton
              :disabled="!inputAddress"
              @click="getAddress"
              style="width: 300px"
              type="info"
            >Get</NButton>
          </div>
        </div>
      </template>
      <template v-slot:bottom>
        <div class="sub-head">
          <NIcon :component="PencilOutline" size="30" :depth="2" />
          <span class="sub-head-text">2) Validate</span>
        </div>
        <div class="sub-content">
          <div style="text-align: center; padding-top: 20px">
            <NButton
              :disabled="!inputAddress"
              style="width: 100%"
              type="primary"
              @click="handleClickValidate"
            >
              <span>{{ buttonText }}</span>
            </NButton>
          </div>
          <NDivider></NDivider>
          <div
            v-if="contractAddress"
            style="text-align: center"
          >Contract address: {{ contractAddress }}</div>
        </div>
      </template>
    </MainCard>
  </main>
</template>

<style lang="less" scoped>
.demo-header {
  background-color: #50509f;
  text-align: center;
  font-size: 20px;
  color: white;
  padding: 10px 0;
}
main {
  display: flex;
  justify-content: center;
  padding-top: 40px;
  .sub-head {
    display: flex;
    align-items: center;
    height: 30px;
    &-text {
      font-size: 16px;
      padding-left: 20px;
    }
  }
  .sub-content {
    padding-top: 20px;
    &.upload {
      display: flex;
    }
    &-left {
      width: 160px;
      margin-left: 30px;
    }
    .name {
      margin-top: 8px;
    }
    .column {
      font-size: 16px;
    }
  }
}
</style>
