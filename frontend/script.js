const container = document.getElementById("emojiGrid");
const searchInput = document.getElementById("search");
const nsfwToggle = document.getElementById("nsfwToggle");
const tagFiltersContainer = document.getElementById("tagFilters");
const emojiCount = document.getElementById("emojiCount");

let allEmojis = [];
let activeTags = new Set();

fetch("/api/emojis")
  .then((response) => response.json())
  .then((emojis) => {
    allEmojis = Object.entries(emojis).map(([name, data]) => ({ name, ...data }));
    buildTagFilters();
    renderEmojis();
  })
  .catch((error) => console.error("Error loading emojis:", error));

const buildTagFilters = () => {
  const allTags = [...new Set(allEmojis.flatMap((e) => e.tags ?? []))].sort();
  tagFiltersContainer.innerHTML = "";

  allTags.forEach((tag) => tagFiltersContainer.append(createTagToggle(tag)));
};

const createTagToggle = (tag) => {
  const label = document.createElement("label");
  label.className = "tag-switch";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) activeTags.add(tag);
    else activeTags.delete(tag);
    renderEmojis();
  });

  const span = document.createElement("span");
  span.textContent = tag;

  label.append(checkbox, span);
  return label;
};

const renderEmojis = () => {
  const term = searchInput.value.trim().toLowerCase();
  const showNsfw = nsfwToggle.checked;
  const hasActiveFilters = term.length > 0 || activeTags.size > 0;

  container.innerHTML = "";

  const visibleEmojis = allEmojis.filter((emoji) => showNsfw || !emoji.nsfw);

  const filteredEmojis = visibleEmojis.filter((emoji) => {
    if (activeTags.size > 0 && ![...activeTags].every((t) => (emoji.tags ?? []).includes(t))) return false;
    const searchable = [emoji.name, ...(emoji.tags ?? [])].join(" ").toLowerCase();
    return searchable.includes(term);
  });

  const emojiCountText = hasActiveFilters ? `${filteredEmojis.length} / ${visibleEmojis.length}` : `${visibleEmojis.length}`;
  emojiCount.textContent = `Showing ${emojiCountText} emojis`;

  if (filteredEmojis.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "no-emojis-message";
    emptyMessage.textContent = "No emojis available";
    container.append(emptyMessage);
    return;
  }

  filteredEmojis.forEach((emoji) => {
    const wrapper = document.createElement("div");
    wrapper.className = "emoji";

    const img = document.createElement("img");
    img.src = emoji.url;
    img.alt = emoji.name;

    const label = document.createElement("div");
    label.textContent = emoji.name;

    wrapper.append(img, label);
    const filename = emoji.url.split("/").at(-1);
    wrapper.addEventListener("click", () => downloadImage(emoji.url, filename));
    container.append(wrapper);
  });
};

searchInput.addEventListener("input", renderEmojis);
nsfwToggle.addEventListener("change", renderEmojis);

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
