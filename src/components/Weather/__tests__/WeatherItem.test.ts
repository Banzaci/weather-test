import { calculateFromFarToCel } from "../WeatherItem";

it('Convert fahrenheit to celsius', () => {
  expect(calculateFromFarToCel(100)).toEqual(37);
  expect(calculateFromFarToCel(1)).toEqual(-17);
});