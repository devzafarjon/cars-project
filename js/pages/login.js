import { getFormData } from "../get-form-data.js"

const elForm = document.getElementById("form")

async function login(user) {
  try {
    const req = await fetch("https://json-api.uz/api/project/fn44/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      method: "POST",
    })
    const res = await req.json()
    return res
  } catch {
    throw new Error("Ro'yhatdan o'tishda xatolik bo'ldi!")
  }
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  const result = getFormData(elForm)

  // Show loading state
  const submitBtn = elForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Kiring..."
  submitBtn.disabled = true

  login(result)
    .then((res) => {
      if (res.access_token) {
        localStorage.setItem("token", res.access_token)
        alert("Muvaffaqiyatli kirdingiz!")
        window.location.href = "../../index.html"
      } else {
        alert("Login yoki parol noto'g'ri!")
      }
    })
    .catch((error) => {
      alert(error.message || "Login yoki parol noto'g'ri!")
    })
    .finally(() => {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    })
})
