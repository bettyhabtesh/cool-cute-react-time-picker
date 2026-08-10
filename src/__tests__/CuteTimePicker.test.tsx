import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { CuteTimePicker } from "../components/CuteTimePicker";

function ControlledHarness({
  initial = "07:30",
  onChange,
}: {
  initial?: string;
  onChange?: (t: string) => void;
}) {
  const [time, setTime] = useState(initial);
  return (
    <CuteTimePicker
      value={time}
      onChange={(t) => {
        setTime(t);
        onChange?.(t);
      }}
      theme="latte-glow"
      decorations={false}
      showActions
      onCancel={() => undefined}
    />
  );
}

describe("CuteTimePicker", () => {
  it("renders controlled value", () => {
    render(
      <CuteTimePicker
        value="14:15"
        theme="latte-glow"
        format="24h"
        decorations={false}
        showActions={false}
      />,
    );
    expect(screen.getByLabelText(/Hour 14/i)).toHaveTextContent("14");
    expect(screen.getByLabelText(/Minute 15/i)).toHaveTextContent("15");
  });

  it("supports uncontrolled defaultValue", () => {
    render(
      <CuteTimePicker
        defaultValue="09:45"
        theme="latte-glow"
        decorations={false}
        showActions={false}
      />,
    );
    expect(screen.getByLabelText(/Hour 09/i)).toHaveTextContent("09");
    expect(screen.getByLabelText(/Minute 45/i)).toHaveTextContent("45");
  });

  it("toggles AM/PM", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ControlledHarness initial="07:30" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "PM" }));
    expect(onChange).toHaveBeenCalledWith("19:30");
  });

  it("switches selection mode from time display", async () => {
    const user = userEvent.setup();
    render(
      <CuteTimePicker
        defaultValue="07:30"
        theme="latte-glow"
        decorations={false}
        showActions={false}
      />,
    );

    await user.click(screen.getByLabelText(/Minute 30/i));
    expect(screen.getByLabelText(/Minute selection clock/i)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/Hour 07/i));
    expect(screen.getByLabelText(/Hour selection clock/i)).toBeInTheDocument();
  });

  it("calls onConfirm with current time", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <CuteTimePicker
        defaultValue="08:00"
        theme="latte-glow"
        decorations={false}
        onConfirm={onConfirm}
        onCancel={() => undefined}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(onConfirm).toHaveBeenCalledWith("08:00");
  });

  it("hides AM/PM in 24h mode", () => {
    render(
      <CuteTimePicker
        value="19:30"
        format="24h"
        theme="latte-glow"
        decorations={false}
        showActions={false}
      />,
    );
    expect(screen.queryByRole("button", { name: "AM" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "PM" })).not.toBeInTheDocument();
  });
});
