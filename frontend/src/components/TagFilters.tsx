import { For } from "solid-js";
import type { Component } from "solid-js";
import type { EmojiStore } from "../stores/emojiStore";

interface TagFiltersProps {
  store: EmojiStore;
}

const TagFilters: Component<TagFiltersProps> = (props) => {
  const toggleTag = (tag: string) => {
    const tags = new Set(props.store.activeTags());
    if (tags.has(tag)) {
      tags.delete(tag);
    } else {
      tags.add(tag);
    }
    props.store.setActiveTags(tags);
  };

  return (
    <div id="tagFilters" class="tag-filters">
      <For each={props.store.availableTags()}>
        {(tag) => (
          <label class="tag-switch">
            <input
              type="checkbox"
              checked={props.store.activeTags().has(tag)}
              onChange={() => toggleTag(tag)}
            />
            <span>{tag}</span>
          </label>
        )}
      </For>
    </div>
  );
};

export default TagFilters;
