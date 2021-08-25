const rewire = require("rewire")
const Tweets = rewire("./Tweets")
const descendingComparator = Tweets.__get__("descendingComparator")
const stableSort = Tweets.__get__("stableSort")
// @ponicode
describe("descendingComparator", () => {
    test("0", () => {
        let callFunction = () => {
            descendingComparator([-100, -5.48, 1, 1, -5.48, -5.48, 0, 0, 100, 0, 0, 1, 0, 0, 100, -5.48, -100, -5.48, -5.48, 100], [100, -5.48, 100, 100, -100, -5.48, -100, -100, 0, 0, 0, -100, -5.48, 100, 1, 100, -5.48, 100, -100, 1], "bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            descendingComparator([100, 1, -100, -100, 1, 1, -100, -5.48, -100, 100, 1, -100, 0, 1, 100, 0, -5.48, 100, 1, 100], [-100, 1, -100, 0, -5.48, 100, 100, 0, -100, -100, 100, -100, 100, 0, 1, -100, -100, 1, 100, -100], 12)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            descendingComparator([-100, 1, -5.48, 0, -5.48, 100, 100, -5.48, -100, 100, 1, -100, 1, -5.48, 1, -100, 100, -100, 0, 100], [0, 0, -100, -100, 1, -5.48, -100, -100, 100, -5.48, -5.48, -100, 1, -5.48, 0, 100, 100, 1, 1, 1], 56784)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            descendingComparator([-5.48, -100, 0, 0, 100, 0, -5.48, 100, 0, 0, 100, 1, -5.48, -100, -5.48, 0, -5.48, -5.48, -5.48, -100], [-5.48, -5.48, -5.48, 1, 1, 100, 0, 100, -5.48, -5.48, -5.48, -5.48, 1, 0, -100, -100, 1, -5.48, -100, -5.48], "bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            descendingComparator([1, 100, -5.48, -5.48, -100, 0, -100, 1, -100, 100, -100, 0, -5.48, -5.48, 1, -5.48, 0, -5.48, 0, 100], [-5.48, 0, 0, -5.48, 1, 1, -5.48, -100, 1, 100, -5.48, 1, 0, 100, 100, 0, 0, 1, -5.48, -5.48], 56784)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            descendingComparator([], undefined, Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("stableSort", () => {
    test("0", () => {
        let param1 = [[10, -45.9, 103.5, 0.955674], ["a", "b", "043", "foo bar"], [10, -45.9, 103.5, 0.955674], [-1, 0.5, 1, 2, 3, 4, 5], ["foo bar", -0.353, "**text**", 4653], [-1, 0.5, 1, 2, 3, 4, 5], [-1, 0.5, 1, 2, 3, 4, 5], ["a", "b", "043", "foo bar"]]
        let callFunction = () => {
            stableSort(param1, [-1, 0.5, 1, 2, 3, 4, 5])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1 = [[10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], ["a", "b", "043", "holasenior"], ["a", "b", "043", "foo bar"], ["a", "b", "043", "holasenior"], [-1, 0.5, 1, 2, 3, 4, 5], ["a", "b", "043", "foo bar"]]
        let callFunction = () => {
            stableSort(param1, [-1, 0.5, 1, 2, 3, 4, 5])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [[-1, 0.5, 1, 2, 3, 4, 5], [10, -45.9, 103.5, 0.955674], ["a", "b", "043", "holasenior"], [10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653], [10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653], ["foo bar", -0.353, "**text**", 4653]]
        let callFunction = () => {
            stableSort(param1, [-1, 0.5, 1, 2, 3, 4, 5])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1 = [["foo bar", -0.353, "**text**", 4653], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653], [10, -45.9, 103.5, 0.955674], ["a", "b", "043", "foo bar"]]
        let callFunction = () => {
            stableSort(param1, [-1, 0.5, 1, 2, 3, 4, 5])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [["a", "b", "043", "foo bar"], ["a", "b", "043", "foo bar"], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653], ["a", "b", "043", "foo bar"], [10, -45.9, 103.5, 0.955674]]
        let callFunction = () => {
            stableSort(param1, ["a", "b", "043", "holasenior"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            stableSort(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
