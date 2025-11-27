import { initialState, reducer, getOrderbyNumberRequest } from "./slice";

describe("order by number reducer", () => {
  it("should return the initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return order with "getOrderbyNumberRequest.fulfilled" action', () => {
    const temporyData = {
      success: true,
      orders: [
        {
          ingredients: ["123", "456"],
          _id: "123",
          status: "status",
          number: 123,
          name: "name",
          createdAt: "time",
          updatedAt: "time",
        },
      ],
    };

    const state = reducer(
      initialState,
      getOrderbyNumberRequest.fulfilled(temporyData)
    );

    expect(state.order).toEqual(temporyData.orders[0]);
  });
});
