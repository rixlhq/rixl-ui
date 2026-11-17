export function animationClassNames() {
  // Single tokens only: DayPicker applies these via classList.add, which
  // throws on whitespace-joined strings — so no cn() merge with rdp
  // defaults here (our keyframes carry the full motion).
  return {
    weeks_before_enter: "rixl-anim-weeks-before-enter",
    weeks_before_exit: "rixl-anim-weeks-before-exit",
    weeks_after_enter: "rixl-anim-weeks-after-enter",
    weeks_after_exit: "rixl-anim-weeks-after-exit",
    caption_before_enter: "rixl-anim-caption-enter",
    caption_before_exit: "rixl-anim-caption-exit",
    caption_after_enter: "rixl-anim-caption-enter",
    caption_after_exit: "rixl-anim-caption-exit",
  };
}
