import type { Component } from "solid-js";
import type { EmojiStore } from "../stores/emojiStore";

interface NsfwToggleProps {
  store: EmojiStore;
}

const NsfwToggle: Component<NsfwToggleProps> = (props) => (
  <label class="nsfw-toggle" for="nsfwToggle">
    <input
      id="nsfwToggle"
      class="nsfw-toggle-input"
      type="checkbox"
      role="switch"
      checked={props.store.showNsfw()}
      onChange={(e) => props.store.setShowNsfw(e.currentTarget.checked)}
    />
    <span class="nsfw-toggle-track" aria-hidden="true">
      <span class="nsfw-toggle-thumb" />
    </span>
    <span class="nsfw-toggle-label">
      {props.store.showNsfw() ? "NSFW Visible" : "NSFW Hidden"}
    </span>
  </label>
);

export default NsfwToggle;
