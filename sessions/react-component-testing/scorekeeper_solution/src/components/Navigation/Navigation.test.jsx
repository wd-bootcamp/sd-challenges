import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from ".";

test("renders with two buttons 'Play' and 'History'", () => {
  render(<Navigation view="play" />);

  const playButton = screen.getByRole("button", {
    name: "Play",
  });

  expect(playButton).toBeInTheDocument();

  const historyButton = screen.getByRole("button", {
    name: "History",
  });

  expect(historyButton).toBeInTheDocument();
});

test("calls the callback with the name of the view when a button is clicked", async () => {
  const handleChangeView = vi.fn();
  const user = userEvent.setup();

  render(<Navigation view="play" onChangeView={handleChangeView} />);

  const historyButton = screen.getByRole("button", { name: "History" });
  await user.click(historyButton);

  expect(handleChangeView).toHaveBeenCalledWith("history");
});
