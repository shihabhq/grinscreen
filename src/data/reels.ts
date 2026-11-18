export type Reel = {
  id: string;
  title: string;      // brand / project name shown as the caption title
  tagline?: string;   // one-line caption shown under the title
  src: string;        // /reels/filename.mp4
  poster: string;     // /reels/posters/filename.jpg
  client?: string;
};

export const reels: Reel[] = [
  { id: "livon", title: "Livon", tagline: "Great event. Even better footage.", src: "/reels/livon.mp4", poster: "/reels/posters/livon.jpg", client: "Livon" },
  { id: "pathao", title: "Pathao", tagline: "Your next favorite shop.", src: "/reels/pathao.mp4", poster: "/reels/posters/pathao.jpg", client: "Pathao" },
  { id: "compilation", title: "Besh", tagline: "Everything about Besh, in one reel.", src: "/reels/compilation.mp4", poster: "/reels/posters/compilation.jpg", client: "Besh" },
  { id: "cnb", title: "CnB", tagline: "Cinematic, from the first frame.", src: "/reels/cnb.mp4", poster: "/reels/posters/cnb.jpg", client: "CnB" },
  { id: "bkash", title: "bKash", tagline: "Hariye Jawa Bangla Khabar, brought back.", src: "/reels/bkash.mp4", poster: "/reels/posters/bkash.jpg", client: "bKash" },
  { id: "fomo", title: "FOMO", tagline: "Trendy fits. Zero effort.", src: "/reels/fomo.mp4", poster: "/reels/posters/fomo.jpg", client: "FOMO" },
  { id: "layered", title: "Layered", tagline: "Looks like a movie. Feels like a bakery.", src: "/reels/layered.mp4", poster: "/reels/posters/layered.jpg", client: "Layered" },
  { id: "zuhra", title: "Zuhra", tagline: "Modest fashion, runway style.", src: "/reels/zuhra.mp4", poster: "/reels/posters/zuhra.jpg", client: "Zuhra" },
  { id: "ghibli-art", title: "Pizzaburg", tagline: "We tried the trend. It worked.", src: "/reels/ghibli-art.mp4", poster: "/reels/posters/ghibli-art.jpg", client: "Pizzaburg" },
  { id: "ambience", title: "Local Cafe", tagline: "The whole cafe, one reel.", src: "/reels/ambience.mp4", poster: "/reels/posters/ambience.jpg", client: "Local Cafe" },
  { id: "outlet-opening", title: "Working Street", tagline: "A street, shot like a movie.", src: "/reels/outlet-opening.mp4", poster: "/reels/posters/outlet-opening.jpg", client: "Working Street" },
  { id: "food", title: "Food Reel", src: "/reels/food.mp4", poster: "/reels/posters/food.jpg" },
  { id: "aug-reel", title: "August Reel", src: "/reels/aug-reel.mp4", poster: "/reels/posters/aug-reel.jpg" },
  { id: "cnb-teaser", title: "CNB Teaser", src: "/reels/cnb-teaser.mp4", poster: "/reels/posters/cnb-teaser.jpg", client: "CNB" },
  { id: "desert1", title: "Desert", src: "/reels/desert1.mp4", poster: "/reels/posters/desert1.jpg" },
  { id: "Interior", title: "Interior", src: "/reels/Interior.mp4", poster: "/reels/posters/Interior.jpg" },
  { id: "outlet", title: "Outlet", src: "/reels/outlet.mp4", poster: "/reels/posters/outlet.jpg", client: "Outlet" },
  { id: "reel-1", title: "Reel 01", src: "/reels/reel-1.mp4", poster: "/reels/posters/reel-1.jpg" },
  { id: "reel-1-2", title: "Reel 02", src: "/reels/reel-1-2.mp4", poster: "/reels/posters/reel-1-2.jpg" },
  { id: "reel-2-3", title: "Reel 03", src: "/reels/reel-2-3.mp4", poster: "/reels/posters/reel-2-3.jpg" },
  { id: "thumb", title: "Thumbnail", src: "/reels/thumb.mp4", poster: "/reels/posters/thumb.jpg" },
];
