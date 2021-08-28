const rewire = require("rewire")
const Resources = rewire("./Resources")
const fetchData = Resources.__get__("fetchData")
const fetchCountries = Resources.__get__("fetchCountries")
// @ponicode
describe("fetchData", () => {
    test("0", async () => {
        await fetchData("United States")
    })

    test("1", async () => {
        await fetchData("France")
    })

    test("2", async () => {
        await fetchData("GB")
    })

    test("3", async () => {
        await fetchData("US")
    })

    test("4", async () => {
        await fetchData("FR")
    })

    test("5", async () => {
        await fetchData(undefined)
    })
})

// @ponicode
describe("fetchCountries", () => {
    test("0", async () => {
        await fetchCountries()
    })
})
