import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return { asPath: "/" };
    },
  };
});

describe("ActiveLink", () => {
  it("Should render ActiveLink correctly", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("Should add a active class if the link is currently active", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );

    expect(getByText("Home")).toHaveClass("active");
  });
});
