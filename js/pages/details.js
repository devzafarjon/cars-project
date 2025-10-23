// Get DOM elements
const loadingState = document.getElementById("loadingState")
const errorState = document.getElementById("errorState")
const carDetails = document.getElementById("carDetails")

// Car detail elements
const carName = document.getElementById("carName")
const carDescription = document.getElementById("carDescription")
const carCountry = document.getElementById("carCountry")
const carCategory = document.getElementById("carCategory")
const carColor = document.getElementById("carColor")
const carColorCircle = document.getElementById("carColorCircle")
const carYear = document.getElementById("carYear")
const carMaxSpeed = document.getElementById("carMaxSpeed")
const carFullDescription = document.getElementById("carFullDescription")
const carId = document.getElementById("carId")
const carCreated = document.getElementById("carCreated")

async function getByID(id) {
  try {
    const req = await fetch(`https://json-api.uz/api/project/fn44/cars/${id}`)
    if (!req.ok) {
      throw new Error(`HTTP error! status: ${req.status}`)
    }
    const res = await req.json()
    return res
  } catch (error) {
    throw new Error("Ma'lumotni olishda xatolik bo'ldi!")
  }
}

function showLoading() {
  loadingState.classList.remove("hidden")
  errorState.classList.add("hidden")
  carDetails.classList.add("hidden")
}

function showError() {
  loadingState.classList.add("hidden")
  errorState.classList.remove("hidden")
  carDetails.classList.add("hidden")
}

function showCarDetails(data) {
  loadingState.classList.add("hidden")
  errorState.classList.add("hidden")
  carDetails.classList.remove("hidden")

  // Update page title
  document.title = `${data.name} - Car Details`

  // Update car information
  carName.textContent = data.name || "Noma'lum"
  carDescription.textContent = data.description || "Tavsif mavjud emas"
  carCountry.textContent = data.country || "Noma'lum"
  carCategory.textContent = data.category || "Noma'lum"
  carColor.textContent = data.colorName || "Noma'lum"
  carYear.textContent = data.year || "Noma'lum"
  carMaxSpeed.textContent = data.maxSpeed ? `${data.maxSpeed} km/h` : "Noma'lum"
  carFullDescription.textContent =
    data.description || "To'liq tavsif mavjud emas"
  carId.textContent = data.id || "N/A"
  carCreated.textContent = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : "Noma'lum"

  // Set color circle background
  if (data.colorName) {
    const colorMap = {
      Qora: "#000000",
      Oq: "#FFFFFF",
      Qizil: "#DC2626",
      "Ko'k": "#2563EB",
      Yashil: "#16A34A",
      Sariq: "#EAB308",
      Kumush: "#94A3B8",
      Oltin: "#F59E0B",
      "Polat ko'k": "#475569",
      "Baliq qizil": "#EF4444",
      "Dengiz ko'k": "#0EA5E9",
    }
    const colorCode = colorMap[data.colorName] || "#6B7280"
    carColorCircle.style.backgroundColor = colorCode
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id")

  if (!id) {
    showError()
    return
  }

  showLoading()

  getByID(id)
    .then((res) => {
      showCarDetails(res)
    })
    .catch((error) => {
      console.error("Error loading car details:", error)
      showError()
    })
})
