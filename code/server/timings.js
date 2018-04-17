let lastTime = 0

export default function logTime(msg) {
  const hrTime = process.hrtime()
  const timeInMicros = hrTime[0] * 1000000 + hrTime[1] / 1000
  const diff = timeInMicros - lastTime
  lastTime = timeInMicros
  console.log(`${msg} took ${diff / 1000}ms`)
}
