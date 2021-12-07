import { getMinFuelToAlign } from "..";

it("calculates optimal fuel alignment position", () => {
    const input = "16,1,2,0,4,2,7,1,2,14";
    expect(getMinFuelToAlign(input)).toEqual(37);
});
