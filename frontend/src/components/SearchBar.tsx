import type { Component } from "solid-js";
import type { EmojiStore } from "../stores/emojiStore";

interface SearchBarProps {
  store: EmojiStore;
}

const SearchBar: Component<SearchBarProps> = (props) => (
  <input
    id="search"
    type="text"
    placeholder="Search emojis..."
    aria-label="Search emojis"
    value={props.store.searchTerm()}
    onInput={(e) => props.store.setSearchTerm(e.currentTarget.value)}
  />
);

export default SearchBar;
