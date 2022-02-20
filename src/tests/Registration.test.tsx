import { render, screen } from "@testing-library/react";
import Registration from "../Components/Registration/Registration";

test("Simple verification of successful render of registraion component", () => {
    render(<Registration />);
    const element = screen.getByText("Lag ny bruker");
    expect(element).toBeInTheDocument();
});
