const baseURL = "https://json-api.uz/api/project/fn44"

export async function getAll(query = "") {
  try {
    const req = await fetch(baseURL + `/cars${query ? query : ""}`)
    const res = await req.json()

    return res
  } catch (error) {
    throw new Error("Ma'limotlarni olishda xatolik bor!")
  }
}
export async function getById() {
  try {
    const req = await fetch(baseURL + `/cars/${id}`)
    const res = await req.json()

    return res
  } catch (error) {
    throw new Error("Ma'lumotni olishda xatolik bor!")
  }
}

export async function addElement(newData) {
  try {
    const token = localStorage.getItem("token")
    const req = await fetch(baseURL + "/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    })
    const res = await req.json()

    return res
  } catch (error) {
    throw new Error("Ma'lumot qo'shishda xatolik bor!")
  }
}

export async function editElement(editedData) {
  try {
    const token = localStorage.getItem("token")
    const req = await fetch(baseURL + `/cars/${editedData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedData),
    })
    const res = await req.json()

    return res
  } catch (error) {
    throw new Error("Ma'lumotni tahrirlashda xatolik bor!")
  }
}

export async function deleteElement(id) {
  try {
    const token = localStorage.getItem("token")
    await fetch(baseURL + `/cars/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return id
  } catch (error) {
    throw new Error("Ma'lumotni o'chirishda xatolik bor!")
  }
}
