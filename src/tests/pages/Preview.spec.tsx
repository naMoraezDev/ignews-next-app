import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import PostPreview, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { mocked } from "jest-mock";
import { createClient } from "../../../prismicio";
import { useRouter } from "next/router";

jest.mock("next-auth/react");
jest.mock("../../../prismicio");

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const postMock = {
  slug: "post_slug",
  title: "post_title",
  content: "<p>post_content</p>",
  updatedAt: "post_updatedAt",
};

describe("Post page", () => {
  it("should render post page correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<PostPreview post={postMock} />);

    expect(screen.getByText("post_title")).toBeInTheDocument();
    expect(screen.getByText("post_content")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("should redirect user to post when user has active subscription", () => {
    const mockRouter = {
      push: jest.fn(), // the component uses `router.push` only
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValue({
      data: {
        user: { name: "John Doe" },
        activeSubscription: "active-subscription",
        expires: "",
      },
      status: "authenticated",
    });

    render(<PostPreview post={postMock} />);

    expect(mockRouter.push).toHaveBeenCalledWith("/posts/post_slug");
  });

  it("should load initial data", async () => {
    const createClientMocked = mocked(createClient);

    createClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "title_text" }],
          content: [{ type: "paragraph", text: "content_text" }],
        },
        last_publication_date: "03-13-2023",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: "post_slug" },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "post_slug",
            title: "title_text",
            content: "<p>content_text</p>",
            updatedAt: "13 de março de 2023",
          },
        },
      })
    );
  });
});
