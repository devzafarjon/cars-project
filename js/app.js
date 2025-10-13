const elOfflinePage = document.getElementById("offlinePage")
const elRetryBtn = document.getElementById("retryBtn")

window.addEventListener("DOMContentLoaded", () => {
  if (!window.navigator.onLine) {
    elOfflinePage.classList.remove("hidden")
  } else {
    elOfflinePage.classList.add("hidden")
  }
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
