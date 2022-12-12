<template>
    <div class="mx-auto p-3">
        <div class="d-flex align-center my-3 px-3">
            <div class="m-0 me-auto d-flex align-items-center gap-3">
                <span class="fs-5 fw-bold">Members</span>
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
import TableComp from '@/components/TableComp.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'
import { API_URL } from '../config'

const socket = io(API_URL, {
    autoConnect: true
})

export default {
    name: 'UsersView',
    components: { TableComp },
    setup() {
        const socketConn = ref(false)
        const isLoading = ref(false)
        const error = ref(false)
        const isEmpty = false
        const columns = ref([
            { value: 'Username', key: 'username' },
            { value: 'Hashtag', key: 'discriminator' },
            { value: 'User Id', key: 'id' },
            { value: 'Date Added', key: 'createdAt' },
        ])
        const rows = ref([])

        onMounted(async () => {
            const res = await axios.get(`${API_URL}/users`)
            let members = res.data?.data
            let newData = members.map(member => {
                return {
                    ...member, 
                    createdAt: new Date(member.createdAt).toLocaleString()
                }
            })
            rows.value = newData ?? []
            socketConn.value = socket.connected

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
            isEmpty
        }
    },
    methods: {

    },
    created() {

    },
}
</script>