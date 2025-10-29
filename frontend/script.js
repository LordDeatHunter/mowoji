const container = document.getElementById("emojiGrid");
const searchInput = document.getElementById("search");

fetch("/api/emojis")
  .then((response) => response.json())
  .then((emojis) => {
    Object.entries(emojis).forEach(([name, url]) => {
      const wrapper = document.createElement("div");
      wrapper.className = "emoji";
      wrapper.dataset.name = name.toLowerCase();

      const img = document.createElement("img");
      img.src = url;
      img.alt = name;

      const label = document.createElement("div");
      label.textContent = name;

      wrapper.append(img, label);
      const filename = url.split("/").at(-1);
      wrapper.addEventListener("click", () => {
        downloadImage(url, filename);
      });
      container.append(wrapper);
    });
  })
  .catch((error) => console.error("Error loading emojis:", error));

searchInput.addEventListener("input", (e) => {
  const term = e.target.value.trim().toLowerCase();
  container.querySelectorAll(".emoji").forEach((el) => {
    el.style.display = el.dataset.name.includes(term) ? "flex" : "none";
  });
});

const downloadImage = (url, filename) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.append(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    })
    .catch((err) => console.error("Download failed:", err));
};
