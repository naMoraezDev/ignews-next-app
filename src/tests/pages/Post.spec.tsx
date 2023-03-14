import { render, screen } from "@testing-library/react";
import { getSession, useSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { mocked } from "jest-mock";
import { createClient } from "../../../prismicio";

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
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any);

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

  it("should load initial data", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "active_subscription",
    } as any);

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

    const response = await getServerSideProps({
      params: { slug: "post_slug" },
    } as any);

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
