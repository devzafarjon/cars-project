import { getFormData } from "../get-form-data.js"

const elForm = document.getElementById("form")

async function register(user) {
  try {
    const req = await fetch(
      "https://json-api.uz/api/project/fn44/auth/register",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        method: "POST",
      }
    )
    const res = await req.json()
    return res
  } catch {
    throw new Error("Ro'yhatdan o'tishda xatolik bo'ldi!")
  }
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  const result = getFormData(elForm)

  // Validate password confirmation
  if (result.password !== result.confirmPassword) {
    alert("Parollar mos kelmaydi!")
    return
  }

  // Show loading state
  const submitBtn = elForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Ro'yxatdan o'tilmoqda..."
  submitBtn.disabled = true

  // Remove confirmPassword from the data sent to server
  delete result.confirmPassword

  register(result)
    .then((res) => {
      if (res.access_token) {
        localStorage.setItem("token", res.access_token)
        alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!")
        window.location.href = "../../index.html"
      } else {
        alert("Ro'yhatdan o'tishda xatolik bo'ldi!")
      }
    })
    .catch((error) => {
      alert(error.message || "Ro'yhatdan o'tishda xatolik bo'ldi!")
    })
    .finally(() => {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    })
})
