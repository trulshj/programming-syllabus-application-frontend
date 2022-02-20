import { render } from "@testing-library/react";
import ArticleList from "../Comoponents/Articles/ArticlesList";

test("Simple verification of successful render of ArticleList", () => {
    expect(render(<ArticleList match={{ params: { id: 1 } }} />)).toBeDefined();
});
