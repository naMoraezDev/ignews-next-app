import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";

jest.mock("next-auth/react");

describe("SignIn", () => {
  it("Should render SignInButton correctly when user is not logged in", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("Should render SignInButton correctly when user logged in", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValue({
      data: { user: { name: "John Doe" }, expires: "" },
      status: "authenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
