<script setup lang="ts">
import MainCard from '../components/MainCard.vue'
import { NIcon, NUpload, NButton, NDivider, type UploadCustomRequestOptions } from 'naive-ui'
import { DocumentAttachOutline, CloudUploadOutline } from '@vicons/ionicons5'
import { ref } from 'vue'
import { globalStore } from '../stores/index'
//@ts-ignore
import mammoth from 'mammoth/mammoth.browser'
const uploadFileName = ref('')
const parseContent = ref<{
  name: string
  age: string
  diagnosis: string
} | null>(null)
const address = ref('')
const progress = ref(0)
const contractAddress = ref('')

const genHashAddress = () => {
  const str1 = Math.random().toString(16).slice(2)
  const str2 = Math.random().toString(16).slice(2)
  const str3 = Math.random().toString(16).slice(2)
  const str4 = Math.random().toString(16).slice(2)

  return `0x${(str1 + str2 + str3 + str4).slice(0, 40)}`
}
const parseText = (str: string) => {
  str = str.replace(/ +/g, '')
  console.log(str)
  const ageReg = /age:(\d{1,3})/i
  const nameReg = /name:(\S*)/i
  const diagnosisReg = /diagnosis:(\S*)/i
  const age = ageReg.exec(str)?.[1] ?? ''
  const name = nameReg.exec(str)?.[1] ?? ''
  const diagnosis = diagnosisReg.exec(str)?.[1] ?? ''
  address.value = genHashAddress()
  parseContent.value = {
    age,
    name,
    diagnosis
  }
}

const upload = () => {
  progress.value = 0
  const num = Math.floor(Math.random() * 16)
  const pp = Math.floor(100 / num)
  let total = 0
  const uploadSlice = () => {
    if (total <= 100) {
      const nextTime = Math.random() * 500
      setTimeout(() => {
        const realPP = pp + Math.floor(Math.random() * 10)
        progress.value = Math.min(100, realPP + progress.value)
        total += realPP
        uploadSlice()
      }, nextTime)
    } else {
      contractAddress.value = genHashAddress()
      localStorage.setItem(address.value, contractAddress.value)
    }
  }
  setTimeout(() => {
    uploadSlice()
  }, 200)
}

const customRequest = (res: UploadCustomRequestOptions) => {
  clear()
  uploadFileName.value = res.file.name

  const reader = new FileReader()
  reader.onload = function () {
    const arrayBuffer = this.result
    console.log('arrayBuffer', arrayBuffer)
    mammoth
      .extractRawText({
        arrayBuffer
      })
      .then(function (resultObject: any) {
        parseText(resultObject.value as string)
      })
  }
  reader.readAsArrayBuffer(res.file.file as Blob)
}

const clear = () => {
  progress.value = 0
  uploadFileName.value = ''
  parseContent.value = null
  address.value = ''
  contractAddress.value = ''
}
</script>

<template>
  <div
    class="demo-header"
  >Blockchain-based privacy protection mechanism for electronic health records</div>
  <main class="main">
    <MainCard title="Hospital">
      <template v-slot:top>
        <div class="sub-head">
          <NIcon :component="DocumentAttachOutline" size="30" :depth="2" />
          <span class="sub-head-text">1) Upload patient record</span>
        </div>
        <div class="sub-content upload">
          <div class="sub-content-left">
            <NUpload
              :max="1"
              :multiple="false"
              action="/"
              :default-file-list="[]"
              list-type="image-card"
              :custom-request="customRequest"
              @remove="clear"
            >Upload</NUpload>
            <div class="name" v-if="uploadFileName">{{ uploadFileName }}</div>
          </div>
          <div class="sub-content-right">
            <div v-if="parseContent" class="sub-content-main">
              <div class="column">Name: {{ parseContent.name }}</div>
              <div class="column">Age: {{ parseContent.age }}</div>
              <div class="column">Diagnosis: {{ parseContent.diagnosis }}</div>
              <div class="column">Address: {{ address }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:bottom>
        <div class="sub-head">
          <NIcon :component="CloudUploadOutline" size="30" :depth="2" />
          <span class="sub-head-text">2) Upload to blockchain</span>
        </div>
        <div class="sub-content">
          <NButton
            :disabled="!address || progress >= 100"
            @click="upload"
            type="primary"
            style="width: 100%"
          >
            <div v-if="progress === 0">Upload to Blockchain</div>
            <div v-else>
              Upload
              <span style="padding-left: 20px" v-if="progress">{{ progress + '%' }}</span>
            </div>
          </NButton>
        </div>
        <div v-if="contractAddress" class="contract-address-content">
          <NDivider></NDivider>
          <div
            style="font-size: 16px; text-align: center; padding-bottom: 10px;"
          >Smart Contract Address: {{ contractAddress }}</div>
        </div>
      </template>
    </MainCard>
  </main>
</template>

<style lang="less">
.demo-header {
  background-color: #50509f;
  text-align: center;
  font-size: 20px;
  color: white;
  padding: 10px 0;
}
.main {
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
