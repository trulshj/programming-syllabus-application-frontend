import { render, screen } from "@testing-library/react";
import Login from "../Comoponents/Login/Login";

test("Simple verification of successful render of Login component", () => {
    render(<Login />);
    const element = screen.getByText("Passord");
    expect(element).toBeInTheDocument();
});
