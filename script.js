document.querySelectorAll('[data-word-counter]').forEach((field) => {
  const count = field.nextElementSibling.querySelector('[data-count]');
  const update = () => {
    const words = field.value.trim() ? field.value.trim().split(/\s+/) : [];
    count.textContent = words.length;
  };
  field.addEventListener('input', update);
  update();
});
