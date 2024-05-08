export default function timeConversion(restTime: number) {
  const day: string | number = Math.floor(restTime / 86400000)
  let hour: string | number = Math.floor((restTime / 3600000) % 24)
  let min: string | number = Math.floor((restTime / 60000) % 60)
  let sec: string | number = Math.floor((restTime / 1000) % 60)

  hour = hour < 10 ? `0${hour}` : hour
  min = min < 10 ? `0${min}` : min
  sec = sec < 10 ? `0${sec}` : sec
  let format = ''
  const minsec = `<span style="color:red;">${min}</span>分<span style="color:red;">${sec}</span>秒`

  const hourminsec = `<span style="color:red;">${hour}</span>小时${minsec}`
  if (day > 0) {
    format = `${day}天$${hourminsec}`
  }
  if (day <= 0 && Number(hour) > 0) {
    format = `${hourminsec}`
  }
  if (day <= 0 && Number(hour) <= 0) {
    format = `${minsec}`
  }
  return format
}
