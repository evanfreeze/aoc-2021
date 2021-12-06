import { calculateFishGrowth } from "..";

it("returns the expected result for the sample data", () => {
    expect(calculateFishGrowth("3,4,3,1,2", 18)).toEqual(26);
    expect(calculateFishGrowth("3,4,3,1,2", 80)).toEqual(5934);
    // expect(calculateFishGrowth("3,4,3,1,2", 256)).toEqual(26984457539);
});
