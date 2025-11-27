import {
  initialState,
  reducer,
  getIngredientsRequest,
} from "./burger-ingredients";

describe("burger-ingredients reducer", () => {
  it("should return the initial state", () => {
    const state = reducer(undefined, {})
    expect(state).toEqual(initialState);
  });

  it('should return object with an ingredient with "getIngredientsRequest.fulfilled" action', () => {
    const temporyData = [
      {
        _id: "1",
        _v: 0,
        name: "name",
        calories: 1,
        carbohydrates: 1,
        fat: 1,
        proteins: 1,
        image: "image",
        image_large: "image",
        image_mobile: "image",
        price: 1,
      },
    ];
    const state = reducer(initialState, getIngredientsRequest.fulfilled(temporyData));
    expect(state.ingredients).toEqual(temporyData);
  });

  it('should return initialState with "getIngredientsRequest.reject"', () => {
    const temporyData = undefined
    const state = reducer(initialState, getIngredientsRequest.rejected(temporyData));

    expect(state).toEqual(initialState)
  })
});
