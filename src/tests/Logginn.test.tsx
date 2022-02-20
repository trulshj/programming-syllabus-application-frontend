import { render, screen } from "@testing-library/react";
import Login from "../Comoponents/Login/Login";

test("Simple verification of successful render of Logginn component", () => {
    render(<Login />);
    const element = screen.getByText("Passord");
    expect(element).toBeInTheDocument();
});
