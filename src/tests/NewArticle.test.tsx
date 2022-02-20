import { render, screen } from "@testing-library/react";
import NewArticle from "../Comoponents/Articles/NewArticle";

test("Simple verification of successful render of NewArticle component", () => {
    render(<NewArticle />);
    const element = screen.getByText("Last opp bilde :");
    expect(element).toBeInTheDocument();
});
