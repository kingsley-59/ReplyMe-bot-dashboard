<template>
    <div class="mx-auto p-3">
      <div class="d-flex align-center my-3 px-3">
        <div class="m-0 me-auto d-flex align-items-center gap-3">
          <span class="fs-5 fw-bold">Tags</span>
          <span class="rounded-circle" :style="{
            width: '10px',
            height: '10px',
            background: socketConn ? 'green' : 'red'
          }"></span>
        </div>
      </div>
      <TableComp :columns="columns" :rows="rows" />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import TableComp from '../components/TableComp.vue';
  import axios from 'axios';
  import { onMounted, ref } from 'vue'
  import calculateTimeDiff from '@/utils/calculateTimeDiff';
  import { io } from 'socket.io-client'
  import { API_URL } from '../config'
  
  const socket = io(API_URL, {
    autoConnect: true
  })
  
  const {
    calculateTimeDiffInSecs,
    convertSecsToMinutes,
    convertMinsToHours
  } = calculateTimeDiff
  
  export default {
    name: 'HomeView',
    components: { TableComp },
    setup() {
      const socketConn = ref(false)
      const isLoading = ref(false)
      const error = null
      const isEmpty = false
      const columns = ref([
        { value: 'Message ID', key: 'messageId' },
        { value: 'User', key: 'fullname' },
        { value: 'Tagged', key: 'taggedUserFullname' },
        { value: 'Message', key: 'content' },
        { value: 'Has Replied', key: 'hasReplied' },
      ])
      const rows = ref([])
  
      onMounted(async () => {
        const res = await axios.get(`http://localhost:5000/api/v1/raw/tags`)
        let tags = res.data?.data
        let newData = tags.map(tag => {
          return {
            ...tag,
            hasReplied: tag.hasReplied === false ? 'No' : 'Yes',
            createdAt: new Date(tag.createdAt).toLocaleString(),
          }
        })
        rows.value = newData
        socketConn.value = socket.connected
  
        socket.on('test', data => console.log(data))
  
        socket.on('new-message', (data) => {
          console.log({newMsg: data})
        })
  
        socket.on('new-tags', data => {
          console.log({newTag: data})
        })
  
        socket.on('tags-update', data => {
          console.log({tagUpdate: data})
        })
  
        socket.on('connect', () => socketConn.value = socket.connected)
        socket.on('disconnect', () => {
          socketConn.value = socket.connected
          socket.removeAllListeners()
        })
      })
  
      
  
  
      return {
        socketConn,
        columns,
        rows,
        isLoading,
        error,
        isEmpty,
      }
    },
    methods: {
  
    },
    async created() {
  
    },
  }
  
  </script>
  
  <!-- const rows = [
        { id: 0, name: 'John', gender: 'male', age: '23' },
        { id: 1, name: 'Daniel', gender: 'male', age: '43' },
        { id: 2, name: 'Peter', gender: 'male', age: '27' },
        { id: 3, name: 'Mike', gender: 'male', age: '20' },
        { id: 4, name: 'Paul', gender: 'male', age: '36' },
      ] -->