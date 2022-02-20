import { render, screen } from "@testing-library/react";
import RegisteredUserMeny from "../Components/Meny/RegisteredUserMeny";

test("Simple verification of successful render of Meny component", () => {
    render(<RegisteredUserMeny />);
    const element = screen.getByText("Mine undervisningsopplegg");
    expect(element).toBeInTheDocument();
});