import { getAll } from "./request.js"
import { ui } from "./ui.js"

const elOfflinePage = document.getElementById("offlinePage")
const elFilterTypeSelect = document.getElementById("filterTypeSelect")
const elFilterValueSelect = document.getElementById("filterValueSelect")
const elRetryBtn = document.getElementById("retryBtn")

let backendData = null
let worker = new Worker("worker.js")
let filterKey = null
let filterValue = null

window.addEventListener("DOMContentLoaded", () => {
  if (!window.navigator.onLine) {
    elOfflinePage.classList.remove("hidden")
  } else {
    elOfflinePage.classList.add("hidden")
  }

  getAll()
    .then((res) => {
      backendData = res
      ui(backendData.data)
    })
    .catch((error) => {
      alert(error.message)
    })
})

elFilterTypeSelect.addEventListener("change", (e) => {
  const value = e.target[e.target.selectedIndex].value
  filterKey = value
  if (backendData) {
    worker.postMessage({
      functionName: "filterByType",
      params: [backendData.data, value],
    })
  } else {
    alert("Ma'lumot mavjud emas")
  }
})

elFilterValueSelect.addEventListener("change", (e) => {
  const value = e.target[e.target.selectedIndex].value
  filterValue = value

  const elContainer = document.getElementById("container")
  elContainer.innerHTML = ""

  if (filterKey && filterValue && backendData) {
    getAll(`?${filterKey}=${filterValue}`)
      .then((res) => {
        ui(res.data)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        filterKey = null
        filterValue = null
      })
  }
})

worker.addEventListener("message", (e) => {
  const result = e.data
  elFilterValueSelect.classList.remove("hidden")
  elFilterValueSelect.innerHTML = ""
  const option = document.createElement("option")
  option.selected = true
  option.disabled = true
  option.textContent = "All"
  elFilterValueSelect.appendChild(option)
  result.forEach((element) => {
    const option = document.createElement("option")
    option.value = element
    option.textContent = element
    elFilterValueSelect.appendChild(option)
  })
})

window.addEventListener("online", () => {
  elOfflinePage.classList.add("hidden")
})

window.addEventListener("offline", () => {
  elOfflinePage.classList.remove("hidden")
})

if (elRetryBtn) {
  elRetryBtn.addEventListener("click", () => {
    if (window.navigator.onLine) {
      elOfflinePage.classList.add("hidden")
    } else {
      location.reload()
    }
  })
}
