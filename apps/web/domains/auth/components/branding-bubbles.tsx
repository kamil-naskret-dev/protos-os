export function BrandingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -top-32 -right-32 size-[28rem] rounded-full bg-violet/20 blur-3xl animate-bubble-breathe [animation-delay:0s]" />
      <div className="absolute top-1/2 -left-24 size-72 rounded-full bg-violet/15 blur-3xl animate-bubble-breathe [animation-duration:28s] [animation-delay:-9s]" />
      <div className="absolute -bottom-24 right-8 size-80 rounded-full bg-violet/20 blur-3xl animate-bubble-breathe [animation-duration:25s] [animation-delay:-15s]" />
      <div className="absolute top-[28%] right-16 size-14 rounded-full bg-violet/30 animate-bubble-drift will-change-transform [animation-duration:12s] [animation-delay:-3s]" />
      <div className="absolute bottom-[22%] left-12 size-10 rounded-full bg-violet/25 animate-bubble-drift will-change-transform [animation-duration:15s] [animation-delay:-9s]" />
      <div className="absolute top-[42%] left-[38%] size-3 rounded-full bg-violet/60 animate-bubble-float will-change-transform [animation-duration:8s] [animation-delay:-2s]" />
      <div className="absolute top-[18%] left-[52%] size-2 rounded-full bg-violet/50 animate-bubble-float will-change-transform [animation-duration:10s] [animation-delay:-5s]" />
      <div className="absolute bottom-[38%] right-[28%] size-2.5 rounded-full bg-violet/45 animate-bubble-float will-change-transform [animation-duration:9s] [animation-delay:-1s]" />
      <div className="absolute top-[35%] right-[22%] size-28 rounded-full border border-violet/20 animate-bubble-drift will-change-transform [animation-duration:20s] [animation-delay:-6s]" />
      <div className="absolute bottom-[28%] left-[18%] size-16 rounded-full border border-violet/15 animate-bubble-float will-change-transform [animation-duration:17s] [animation-delay:-10s]" />
    </div>
  );
}
