import {getTimes} from 'suncalc'


const TATWA_INTERVAL_MINS = 24
const MILIS_MIN_RATIO = 1000*60

const TATWAS: Record<number, string> = {
    0: "Akash",
    1: "Vayu",
    2: "Tejas",
    3: "Prithvi",
    4: "Apas"
}
const TATWAS_TOTAL = Object.keys(TATWAS).length

function getSunrise(date: Date, latitude: number, longitude: number, height?: number) {
    const times = getTimes(date, latitude, longitude, height)
    return times.sunrise
}

function getTatwa(date: Date, sunrise: Date) {

    console.log("sunrise:", sunrise)
    console.log("now:", date)
    const milis_diff =  date.getTime() - sunrise.getTime()
    console.log("milis_diff:",milis_diff)

    const min_diff = Math.round(milis_diff / MILIS_MIN_RATIO);
    console.log("min_diff:",min_diff)

    const intervals_since_sunrise  = Math.round(min_diff / TATWA_INTERVAL_MINS)
    console.log("intervals_since_sunrise:",intervals_since_sunrise)

    const tatwa_idx = intervals_since_sunrise % TATWAS_TOTAL
    console.log("tatwa_idx:",tatwa_idx)

    return TATWAS[tatwa_idx]
}

export { getTatwa, getSunrise }