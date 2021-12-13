import { getLowPointRiskScore } from "..";

it("calculates the low point risk score correctly for the sample input", () => {
    const sample = ["2199943210", "3987894921", "9856789892", "8767896789", "9899965678"];
    expect(getLowPointRiskScore(sample)).toEqual(15);
});
