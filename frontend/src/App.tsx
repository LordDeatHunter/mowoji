import { createEffect, type Component } from "solid-js";
import { createEmojiStore } from "./stores/emojiStore";
import { fetchEmojis } from "./services/emojiService";
import SearchBar from "./components/SearchBar";
import NsfwToggle from "./components/NsfwToggle";
import TagFilters from "./components/TagFilters";
import EmojiGrid from "./components/EmojiGrid";

const App: Component = () => {
  const store = createEmojiStore();

  // Fetch emojis on mount
  createEffect(async () => {
    try {
      const emojis = await fetchEmojis();
      store.setAllEmojis(emojis);
    } catch (error) {
      console.error("Failed to load emojis:", error);
    }
  });

  return (
    <div class="app">
      <h1>Emoji Viewer</h1>
      <div class="controls">
        <SearchBar store={store} />
        <NsfwToggle store={store} />
      </div>
      <TagFilters store={store} />
      <EmojiGrid store={store} />
    </div>
  );
};

export default App;
