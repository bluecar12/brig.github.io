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

const form = document.querySelector("#signup");
const note = document.querySelector("#form-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  note.hidden = false;
  form.reset();
});
