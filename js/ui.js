export function ui(data) {
  const elContainer = document.getElementById("container")
  elContainer.innerHTML = ""
  data.forEach((el) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content

    const elTitle = clone.querySelector("h2")
    const elDescription = clone.querySelector("p")
    const elCountry = clone.querySelector("[data-country]")
    const elCategory = clone.querySelector("[data-category]")
    const elColor = clone.querySelector("[data-color]")
    const elColorCircle = clone.querySelector("[data-color-circle]")
    const elInfoBtn = clone.querySelector(".js-info")
    const elEditBtn = clone.querySelector(".js-edit")
    const elDeleteBtn = clone.querySelector(".js-delete")

    elDeleteBtn.id = el.id
    elEditBtn.id = el.id
    elInfoBtn.href = `pages/details.html?id=${el.id}`

    elTitle.innerText = el.name
    elDescription.innerText = el.description
    elCountry.innerText = el.country || "Noma'lum"
    elCategory.innerText = el.category || "Noma'lum"
    elColor.innerText = el.colorName || "Noma'lum"

    // Set color circle background
    if (el.colorName) {
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
      const colorCode = colorMap[el.colorName] || "#6B7280"
      elColorCircle.style.backgroundColor = colorCode
    }

    elContainer.appendChild(clone)
  })
}

export function pagination(total, limit, skip) {
  const elPagination = document.getElementById("pagination")
  elPagination.innerHTML = ""
  const remained = total % limit
  const pageCount = (total - remained) / limit
  let activePage = skip / limit + 1

  for (let i = 1; i <= pageCount + (remained > 0 ? 1 : 0); i++) {
    const button = document.createElement("button")
    button.classList.add(
      "join-item",
      "btn",
      "js-page",
      activePage === i ? "btn-active" : null
    )
    button.innerText = i
    button.dataset.skip = limit * i - limit

    elPagination.appendChild(button)
  }
}
