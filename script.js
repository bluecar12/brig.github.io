const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    const filter = chip.dataset.filter;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.kind === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

const FORMSPREE = "https://formspree.io/f/mqpakpqk";
const form = document.querySelector("#signup");
const note = document.querySelector("#form-note");
const submitBtn = document.querySelector("#signup-submit");

function showNote(message) {
  if (!note) return;
  note.hidden = false;
  note.textContent = message;
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const picked = [...form.querySelectorAll('input[name="treats"]:checked')].map(
    (input) => input.value
  );
  if (!picked.length) {
    showNote("Pick at least one treat (or “Whatever is next”).");
    return;
  }

  const data = new FormData(form);
  data.delete("treats");
  data.set("interests", picked.join(", "));
  data.set("_replyto", form.email.value);

  submitBtn.disabled = true;
  showNote("Sending…");

  try {
    const response = await fetch(FORMSPREE, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      window.location.href = new URL("thanks.html", window.location.href).href;
      return;
    }

    const payload = await response.json().catch(() => ({}));
    const errors = payload.errors?.map((error) => error.message).join(" ");
    showNote(errors || "Couldn’t join the waitlist. Try again in a moment.");
    submitBtn.disabled = false;
  } catch {
    showNote("Couldn’t reach the waitlist. Check your connection and try again.");
    submitBtn.disabled = false;
  }
});
