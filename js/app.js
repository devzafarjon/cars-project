const elTimer = document.getElementById("timer")
const elBtn = document.getElementById("f")

setInterval(() => {
  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  elTimer.innerHTML = time
}, 1000)

const worker = new Worker("worker.js")
console.log(worker)

elBtn.addEventListener("click", () => {
  worker.postMessage("test")
})
