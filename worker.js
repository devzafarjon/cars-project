function test() {
  for (let i = 0; i < 10000000; i++) {
    console.log(i)
  }
}

onmessage = (e) => {
  if (e.data === "test") {
    test()
  }
}
