import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return { asPath: "/" };
    },
  };
});

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return { data: null, status: "unauthenticated" };
    },
  };
});

describe("Header", () => {
  it("Should render Header correctly", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
