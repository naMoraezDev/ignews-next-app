import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock("next-auth/react", () => {
  return {
    useSession: () => ({ data: null, status: "unauthenticated" }),
  };
});

jest.mock("next/router", () => {
  return {
    useRouter: () => ({}),
  };
});

const productMock = {
  priceId: "price_id",
  amount: "$amount",
};

describe("Home page", () => {
  it("should render home page correctly", () => {
    render(<Home product={productMock} />);

    expect(screen.getByText("for $amount month")).toBeInTheDocument();
  });
});
