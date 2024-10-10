import { initialState, reducer, postOrderRequest } from "./order";

describe("order reducer", () => {
  it("should return initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return order with "postOrderRequest.fulfilled" action', () => {
    const temporyData = {
      name: "name",
      order: {
        number: 1,
      },
      success: true,
    };

    const state = reducer(
      initialState,
      postOrderRequest.fulfilled(temporyData)
    );

    expect(state).toEqual(temporyData);
  });

  it('should return initialState with "postOrderRequest.reject"', ()=>{
    const temporyData = undefined;
    const state = reducer(initialState, postOrderRequest.rejected(temporyData))

    expect(state).toEqual(initialState)
  })
});
