
export type PodcastType = "story" | "legend" | "entity";

export interface podcast {
  title?: string;
  name?: string;
  content?: string;
  synopsis: string;
  alt_name?: string;
  author: string;
  picture: string;
  pic?: string;
  uuid: string;
  likes: number;
  entity?: podcast[];
  legends?: podcast[];
  stories?: podcast[];
  type: PodcastType;
  audio?: string;
  user_like: boolean;
}