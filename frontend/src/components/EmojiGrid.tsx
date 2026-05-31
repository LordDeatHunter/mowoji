import type { Component } from "solid-js";
import { createMemo, For, Show } from "solid-js";
import EmojiCard from "./EmojiCard";
import type { EmojiStore } from "../stores/emojiStore";

interface EmojiGridProps {
  store: EmojiStore;
}

const EmojiGrid: Component<EmojiGridProps> = (props) => {
  const emojiCountText = createMemo(() => {
    const filtered = props.store.filteredEmojis().length;
    const visible = props.store.visibleCount();
    const hasFilters = props.store.hasActiveFilters();
    return hasFilters ? `${filtered} / ${visible}` : `${visible}`;
  });

  return (
    <>
      <div id="emojiCount" class="emoji-count">
        Showing {emojiCountText()} emojis
      </div>

      <div id="emojiGrid" class="emoji-grid">
        <Show
          when={props.store.filteredEmojis().length > 0}
          fallback={<div class="no-emojis-message">No emojis available</div>}
        >
          <For each={props.store.filteredEmojis()}>
            {(emoji) => <EmojiCard emoji={emoji} />}
          </For>
        </Show>
      </div>
    </>
  );
};

export default EmojiGrid;
