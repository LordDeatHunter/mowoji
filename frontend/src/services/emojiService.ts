import type { Emoji, EmojisResponse } from "../types";

export const fetchEmojis = async (): Promise<Emoji[]> => {
  try {
    const response = await fetch("/api/emojis");
    const data: EmojisResponse = await response.json();
    return Object.entries(data).map(([name, emojiData]) => ({
      name,
      url: emojiData.url,
      tags: emojiData.tags || [],
      nsfw: emojiData.nsfw || false,
    }));
  } catch (error) {
    console.error("Error loading emojis:", error);
    throw error;
  }
};

export const downloadImage = async (
  url: string,
  filename: string,
): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
