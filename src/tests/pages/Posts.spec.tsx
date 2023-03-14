import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Posts, { getStaticProps } from "../../pages/posts";
import { mocked } from "jest-mock";
import { createClient } from "../../../prismicio";

jest.mock("next-auth/react");
jest.mock("../../../prismicio");

const postsMock = [
  {
    slug: "post_slug",
    title: "post_title",
    excerpt: "post_excerpt",
    updatedAt: "post_updatedAt",
  },
];

describe("Posts page", () => {
  it("should render posts page correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<Posts posts={postsMock} />);

    expect(screen.getByText("post_title")).toBeInTheDocument();
  });

  it("should redirect user to post when user has active subscription", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValue({
      data: {
        user: { name: "John Doe" },
        activeSubscription: "active-subscription",
        expires: "",
      },
      status: "authenticated",
    });

    render(<Posts posts={postsMock} />);

    const postLink = screen.getByText("post_title").closest("a");

    expect(postLink).toHaveAttribute("href", "/posts/post_slug");
  });

  it("should load initial data", async () => {
    const createClientMocked = mocked(createClient);

    createClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: "post_uid",
          data: {
            title: [{ type: "heading", text: "title_text" }],
            content: [{ type: "paragraph", text: "content_text" }],
          },
          last_publication_date: "03-13-2023",
        },
      ]),
    } as any);

    const response = await getStaticProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "post_uid",
              title: "title_text",
              excerpt: "content_text",
              updatedAt: "13 de março de 2023",
            },
          ],
        },
      })
    );
  });
});
