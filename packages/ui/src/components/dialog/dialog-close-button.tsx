import {forwardRef, type ComponentProps} from "react";
import {XIcon} from "lucide-react";
import {cn} from "../../lib/cn";
import {Button} from "../button";
import type {RixlTranslations} from "../locale";
import {useTranslations} from "../locale/use-translations";
import {DialogClose} from "./dialog-close";
export type DialogCloseButtonProps = ComponentProps<typeof Button> & {
  /** Screen-reader text of the default icon. Defaults to the provider's string, then English. */
  labels?: Partial<RixlTranslations["dialog"]>;
};
export const DialogCloseButton = forwardRef<HTMLButtonElement, DialogCloseButtonProps>(({className, children, labels, ...props}, ref) => {
  const t = useTranslations("dialog", labels);
  return (
    <DialogClose
      ref={ref}
      render={
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-[max(0.875rem,env(safe-area-inset-top))] end-[max(0.875rem,env(safe-area-inset-right))] size-11 sm:size-7 rounded-rixl-sm opacity-70 hover:opacity-100 ring-offset-rixl-bg",
            className
          )}
          {...props}
        />
      }
    >
      {children ?? (
        <>
          <XIcon aria-hidden="true" />
          <span className="sr-only">{t.close}</span>
        </>
      )}
    </DialogClose>
  );
});
DialogCloseButton.displayName = "DialogCloseButton";
