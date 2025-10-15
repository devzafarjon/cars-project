export function ui(data) {
  const elContainer = document.getElementById("container")
  elContainer.innerHTML = ""
  data.forEach((element) => {
    const clone = document
      .getElementById("cardTemplate")
      .cloneNode(true).content

    const elTitle = clone.querySelector("h2")
    const elDescription = clone.querySelector("p")

    elTitle.innerText = element.name
    elDescription.innerText = element.description

    elContainer.appendChild(clone)
  })
}
