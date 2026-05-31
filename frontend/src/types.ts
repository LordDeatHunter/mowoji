export interface Emoji {
  name: string;
  url: string;
  tags?: string[];
  nsfw?: boolean;
}

export interface EmojisResponse {
  [key: string]: {
    url: string;
    tags?: string[];
    nsfw?: boolean;
  };
}

