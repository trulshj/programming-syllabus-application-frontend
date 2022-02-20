import { render, screen } from "@testing-library/react";
import ArticleDetails from "../Comoponents/Articles/ArticleDetails";

test("Simple verification of render of ArticleDetails", () => {
    render(<ArticleDetails match={{ params: { id: 1 } }} />);
    const element = screen.getByText("Oppgavetittel :");
    expect(element).toBeInTheDocument();
});
