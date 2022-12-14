

const milisPerSecond = 1000
const milisPerMinute = 1000 * 60
const milisPerHour = 1000 * 3600
const milisPerDay = 1000 * 3600 * 24

/**
 * @param {Date} startTime - start time for the calculation
 * @param {Date} endTime
 */
function calculateTimeDiffInSecs(startTime, endTime) {
    const startTimeInMilis = startTime.getTime()
    const endTimeInMilis = endTime.getTime()
    const diffInMilis = endTimeInMilis - startTimeInMilis
    const diffInSeconds = diffInMilis / 1000
    const diffInMinutes = diffInMilis / (1000 * 60)
    const diffInHours = diffInMilis / (1000 * 3600)
    
    return diffInSeconds.toFixed(0)
}

function convertSecsToMinutes(timeInSecs) {
    return timeInSecs / 60
}

function convertMinsToHours(timeInMins) {
    return timeInMins / 60
}

export default {
    calculateTimeDiffInSecs,
    convertSecsToMinutes,
    convertMinsToHours
}