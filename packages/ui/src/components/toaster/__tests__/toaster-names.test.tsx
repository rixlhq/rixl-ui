import {act, cleanup, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it} from "vitest";
import {RixlLocaleProvider, type RixlTranslationsPartial} from "../../locale";
import {Toaster, toast, type ToasterProps} from "../toaster";

afterEach(() => {
  act(() => {
    toast.dismiss();
  });
  cleanup();
});

function renderToaster(props: ToasterProps = {}) {
  render(<Toaster closeButton {...props} />);
  act(() => {
    toast("Saved");
  });
}

describe("Toaster names", () => {
  it("keeps sonner's own region and close-button names when the app sets none", async () => {
    renderToaster();
    await screen.findByText("Saved");
    expect(screen.getByRole("region", {name: /^Notifications/})).toBeInTheDocument();
    expect(screen.getByLabelText("Close toast")).toBeInTheDocument();
  });

  it("passes containerAriaLabel and closeButtonAriaLabel through to sonner", async () => {
    renderToaster({containerAriaLabel: "Meldungen", toastOptions: {closeButtonAriaLabel: "Zu"}});
    await screen.findByText("Saved");
    expect(screen.getByRole("region", {name: /^Meldungen/})).toBeInTheDocument();
    expect(screen.getByLabelText("Zu")).toBeInTheDocument();
  });

  it("keeps the rest of toastOptions when only the close-button name is set", async () => {
    renderToaster({toastOptions: {closeButtonAriaLabel: "Zu", className: "custom-toast"}});
    await screen.findByText("Saved");
    expect(document.querySelector("[data-sonner-toast]")).toHaveClass("custom-toast");
  });

  it("has no provider group of its own: the provider cannot rename the region", async () => {
    // as: a removed group is passed on purpose, to prove the provider no longer reads it.
    const translations = {toaster: {notifications: "Benachrichtigungen"}} as RixlTranslationsPartial;
    render(
      <RixlLocaleProvider translations={translations}>
        <Toaster />
      </RixlLocaleProvider>
    );
    act(() => {
      toast("Saved");
    });
    await screen.findByText("Saved");
    expect(screen.queryByRole("region", {name: /^Benachrichtigungen/})).toBeNull();
  });
});
