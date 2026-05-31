import type { Component } from "solid-js";
import type { EmojiStore } from "../stores/emojiStore";

interface NsfwToggleProps {
  store: EmojiStore;
}

const NsfwToggle: Component<NsfwToggleProps> = (props) => (
  <label class="nsfw-toggle">
    <input
      id="nsfwToggle"
      type="checkbox"
      checked={props.store.showNsfw()}
      onChange={(e) => props.store.setShowNsfw(e.currentTarget.checked)}
    />
    <span>Show NSFW</span>
  </label>
);

export default NsfwToggle;
