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


const TATWA_DESCRIPTIONS: Record<string, string> = {
    "Akash": "Aquí va una descripción de Akash.\nVoluptate ad esse quis sunt non velit officia fugiat deserunt veniam Lorem aliquip Do reprehenderit sunt adipisicing laboris amet sunt amet irure enim cupidatat",
    "Vayu": "Aquí va una descripción de Vayu. \n",
    "Tejas": "Aquí va una descripción de Tejas\nNulla commodo enim ex ipsum officia Lorem. Aute ad veniam pariatur ex mollit.",
    "Prithvi": "Aquí va una descripción de Prithvi\n",
    "Apas": "Aquí va una descripción de Apas\n",
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

export { getTatwa, getSunrise, TATWA_DESCRIPTIONS }