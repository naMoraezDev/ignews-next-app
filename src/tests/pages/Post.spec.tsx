import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { mocked } from "jest-mock";

jest.mock("next-auth/react");
jest.mock("../../../prismicio");

const postMock = {
  slug: "post_slug",
  title: "post_title",
  content: "<p>post_content</p>",
  updatedAt: "post_updatedAt",
};

describe("Post page", () => {
  it("should render post page correctly", () => {
    render(<Post post={postMock} />);

    expect(screen.getByText("post_title")).toBeInTheDocument();
    expect(screen.getByText("post_content")).toBeInTheDocument();
  });

  it("should redirect user if no subscription is found", async () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe" },
        activeSubscription: null,
        expires: "",
      },
      status: "authenticated",
    });

    const response = await getServerSideProps({
      params: { slug: "post_slug" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        }),
      })
    );
  });
});
