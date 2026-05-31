import { downloadImage } from "../services/emojiService";
import type { Component } from "solid-js";
import type { Emoji } from "../types";

interface EmojiCardProps {
  emoji: Emoji;
}

const EmojiCard: Component<EmojiCardProps> = (props) => {
  const handleClick = () => {
    const filename = props.emoji.url.split("/").at(-1) || "emoji";
    void downloadImage(props.emoji.url, filename);
  };

  return (
    <div class="emoji" onClick={handleClick}>
      <img src={props.emoji.url} alt={props.emoji.name} />
      <div>{props.emoji.name}</div>
    </div>
  );
};

export default EmojiCard;
