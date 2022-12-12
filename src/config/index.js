
const devUrl = 'http://localhost:5000/api/v1'
const prodUrl = 'https://replyme-discord-bot-production.up.railway.app/api/v1'

export default {
    API_URL: NODE_ENV === 'production' ? prodUrl : devUrl
}