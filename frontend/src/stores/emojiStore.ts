import { createMemo, createSignal } from "solid-js";
import type { Emoji } from "../types";

export const createEmojiStore = () => {
  const [allEmojis, setAllEmojis] = createSignal<Emoji[]>([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showNsfw, setShowNsfw] = createSignal(false);
  const [activeTags, setActiveTags] = createSignal<Set<string>>(new Set());

  // Derived signal for all available tags
  const availableTags = createMemo(() => {
    const tags = new Set<string>();
    allEmojis().forEach((emoji) => {
      emoji.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  });

  // Derived signal for filtered emojis
  const filteredEmojis = createMemo(() => {
    const term = searchTerm().trim().toLowerCase();
    const tags = activeTags();
    const nsfw = showNsfw();

    // First filter by NSFW
    let filtered = allEmojis().filter((emoji) => nsfw || !emoji.nsfw);

    // Then apply tag filters (all selected tags must be present)
    if (tags.size > 0) {
      filtered = filtered.filter((emoji) => {
        const emojiTags = emoji.tags || [];
        return Array.from(tags).every((tag) => emojiTags.includes(tag));
      });
    }

    // Finally apply search term
    if (term) {
      filtered = filtered.filter((emoji) => {
        const searchable = [emoji.name, ...(emoji.tags || [])]
          .join(" ")
          .toLowerCase();
        return searchable.includes(term);
      });
    }

    return filtered;
  });

  // Computed counts
  const visibleCount = createMemo(() => {
    const nsfw = showNsfw();
    return allEmojis().filter((emoji) => nsfw || !emoji.nsfw).length;
  });

  const hasActiveFilters = createMemo(() => {
    return searchTerm().trim().length > 0 || activeTags().size > 0;
  });

  return {
    allEmojis,
    setAllEmojis,
    searchTerm,
    setSearchTerm,
    showNsfw,
    setShowNsfw,
    activeTags,
    setActiveTags,
    availableTags,
    filteredEmojis,
    visibleCount,
    hasActiveFilters,
  };
};

export type EmojiStore = ReturnType<typeof createEmojiStore>;
