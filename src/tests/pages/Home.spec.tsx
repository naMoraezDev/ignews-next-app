import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";
import { mocked } from "jest-mock";

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

jest.mock("../../services/stripe");

const productMock = {
  priceId: "price_id",
  amount: "$amount",
};

describe("Home page", () => {
  it("should render home page correctly", () => {
    render(<Home product={productMock} />);

    expect(screen.getByText("for $amount month")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const retrieveMocked = mocked(stripe.prices.retrieve);

    retrieveMocked.mockResolvedValueOnce({
      id: "test_price_id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: { product: { priceId: "test_price_id", amount: "$10.00" } },
      })
    );
  });
});
