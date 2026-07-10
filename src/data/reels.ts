export type Reel = {
  id: string;
  title: string;
  src: string;        // /reels/filename.mp4
  poster: string;     // /reels/posters/filename.jpg
  client?: string;
};

export const reels: Reel[] = [
  { id: "outlet-opening", title: "Outlet Opening", src: "/reels/outlet-opening.mp4", poster: "/reels/posters/outlet-opening.jpg", client: "Outlet" },
  { id: "zuhrah", title: "Zuhrah", src: "/reels/zuhrah.mp4", poster: "/reels/posters/zuhrah.jpg", client: "Zuhrah" },
  { id: "food", title: "Food Reel", src: "/reels/food.mp4", poster: "/reels/posters/food.jpg" },
  { id: "ambience", title: "Ambience", src: "/reels/ambience.mp4", poster: "/reels/posters/ambience.jpg" },
  { id: "aug-reel", title: "August Reel", src: "/reels/aug-reel.mp4", poster: "/reels/posters/aug-reel.jpg" },
  { id: "cnb-teaser", title: "CNB Teaser", src: "/reels/cnb-teaser.mp4", poster: "/reels/posters/cnb-teaser.jpg", client: "CNB" },
  { id: "compilation", title: "Compilation", src: "/reels/compilation.mp4", poster: "/reels/posters/compilation.jpg" },
  { id: "desert1", title: "Desert", src: "/reels/desert1.mp4", poster: "/reels/posters/desert1.jpg" },
  { id: "ghibli-art", title: "Ghibli Art", src: "/reels/ghibli-art.mp4", poster: "/reels/posters/ghibli-art.jpg" },
  { id: "Interior", title: "Interior", src: "/reels/Interior.mp4", poster: "/reels/posters/Interior.jpg" },
  { id: "outlet", title: "Outlet", src: "/reels/outlet.mp4", poster: "/reels/posters/outlet.jpg", client: "Outlet" },
  { id: "reel-1", title: "Reel 01", src: "/reels/reel-1.mp4", poster: "/reels/posters/reel-1.jpg" },
  { id: "reel-1-2", title: "Reel 02", src: "/reels/reel-1-2.mp4", poster: "/reels/posters/reel-1-2.jpg" },
  { id: "reel-2-3", title: "Reel 03", src: "/reels/reel-2-3.mp4", poster: "/reels/posters/reel-2-3.jpg" },
  { id: "thumb", title: "Thumbnail", src: "/reels/thumb.mp4", poster: "/reels/posters/thumb.jpg" },
];
