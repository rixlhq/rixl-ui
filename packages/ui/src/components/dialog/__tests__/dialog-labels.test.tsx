import {act, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "../dialog";

const german = {dialog: {close: "Schließen"}};

async function renderOpen(translations: object, closeLabels?: {close?: string}) {
  render(
    <RixlLocaleProvider translations={translations}>
      <Dialog open>
        <DialogContent closeButtonProps={{labels: closeLabels}}>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    </RixlLocaleProvider>
  );
  await act(async () => {});
}

describe("DialogCloseButton labels", () => {
  it("is named Close in English by default", async () => {
    await renderOpen({});
    expect(screen.getByRole("button", {name: "Close"})).toBeInTheDocument();
  });

  it("takes the provider's string", async () => {
    await renderOpen(german);
    expect(screen.getByRole("button", {name: "Schließen"})).toBeInTheDocument();
  });

  it("lets labels beat the provider", async () => {
    await renderOpen(german, {close: "Zu"});
    expect(screen.getByRole("button", {name: "Zu"})).toBeInTheDocument();
  });
});
