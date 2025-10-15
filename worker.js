function filterByType(data, type) {
  const types = data.map((element) => element[type])
  const result = Array.from(new Set(types))
  return result
}

const actions = {
  filterByType,
}

onmessage = function (e) {
  const func = e.data.functionName
  const params = e.data.params
  const result = actions[func](...params)
  postMessage(result)
}
