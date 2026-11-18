import {act, cleanup, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {Toaster, toast, type ToasterProps} from "../toaster";

afterEach(() => {
  act(() => {
    toast.dismiss();
  });
  cleanup();
});

const german = {toaster: {notifications: "Benachrichtigungen", closeToast: "Toast schließen"}};

function renderToaster(translations: object, props: ToasterProps = {}) {
  render(
    <RixlLocaleProvider translations={translations}>
      <Toaster closeButton {...props} />
    </RixlLocaleProvider>
  );
  act(() => {
    toast("Saved");
  });
}

describe("Toaster strings", () => {
  it("are English by default", async () => {
    renderToaster({});
    await screen.findByText("Saved");
    expect(screen.getByRole("region", {name: /^Notifications/})).toBeInTheDocument();
    expect(screen.getByLabelText("Close toast")).toBeInTheDocument();
  });

  it("take the provider's strings", async () => {
    renderToaster(german);
    await screen.findByText("Saved");
    expect(screen.getByRole("region", {name: /^Benachrichtigungen/})).toBeInTheDocument();
    expect(screen.getByLabelText("Toast schließen")).toBeInTheDocument();
  });

  it("let sonner's own props beat the provider", async () => {
    renderToaster(german, {containerAriaLabel: "Meldungen", toastOptions: {closeButtonAriaLabel: "Zu"}});
    await screen.findByText("Saved");
    expect(screen.getByRole("region", {name: /^Meldungen/})).toBeInTheDocument();
    expect(screen.getByLabelText("Zu")).toBeInTheDocument();
  });
});
