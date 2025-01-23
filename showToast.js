export const showToast = (operation, id) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");

  if (operation === "add") {
    toast.textContent = `Product Added With Id ${id}.`;
  } else if (operation === "change") {
    toast.textContent = `Quentity change In Id ${id}.`;
  } else {
    toast.textContent = `Id Number ${id} Product has been Deleted.`;
  }
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
};
