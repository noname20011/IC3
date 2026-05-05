// scroll to question when click drawer list
export default function scrollToAnchorWithOffset(id: string, offset = 100) {
  const el = document.getElementById(id);
  if (!el) return;

  // Get element's top position relative to the document
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};
