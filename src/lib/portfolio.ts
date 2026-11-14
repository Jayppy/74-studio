import nothingLastForeverThumb from "@/assets/nothing-last-forever-thumb.jpg";
import thirtySecondsDemoThumb from "@/assets/thirty-seconds-demo-thumb.jpg";
import mixtrapThumb from "@/assets/mixtrap-thumb.jpg";

export type Category = "AI" | "2D" | "3D" | "Lyric" | "Editing" | "UGC";

export const CATEGORY_LABELS: Record<Category, string> = {
  AI: "AI",
  "2D": "2D",
  "3D": "3D",
  Lyric: "Lyric Videos",
  Editing: "Video Editing",
  UGC: "UGC/Product Ads",
};

export type Project = {
  id: string;
  title: string;
  client: string;
  category: Category;
  source: "youtube" | "drive";
  videoId: string;
  concept?: boolean;
  vertical?: boolean;
  /** Custom cover when the video's own thumbnail is blank. */
  thumb?: string;
};

const yt = (videoId: string, title: string, client = "74 STUDIO"): Project => ({
  id: `yt-${videoId}`, title, client, category: "3D", source: "youtube", videoId,
});
const dr = (videoId: string, title: string, category: Category, concept = true): Project => ({
  id: `dr-${videoId}`, title, client: concept ? "Concept project" : "74 STUDIO", category, source: "drive", videoId, concept,
});

function MUSIC_VIDEOS_DRIVE(): Project[] {
  return [
    { ...dr("1XGjGPO92HIOL_bnPKGRCrip3kq2-ElmD", "Nothing Last Forever", "2D", false), thumb: nothingLastForeverThumb },
    dr("16AMVTNBU4MOrNhCp3-2karmjWh-WzoYC", "Tunde Visual Track", "AI", false),
    dr("1u7yhdTLstS-HKZTocKfYLh-iTJeA9Aqm", "I Am Music", "3D", false),
    dr("18H1apHNPbkEZCAd2acqTwaeSOawY1sOT", "Animated Music Video", "2D", false),
    dr("1igj3-mT2ehCfjM2_YdGU7VonmA2Mleio", "Night City Music Video", "AI", false),
    dr("1mSuySSWMQ91hLKf46N4F5KE_yLTO95dh", "Animated Music Video II", "2D", false),
  ];
}

// Google Drive "Selected works" folder (1yEpn_IpxCxHRYpG67fRNKqjdNf4kptFW), in the owner's chosen order.
function SELECTED_WORKS_DRIVE(): Project[] {
  return [
    dr("1H2ZflNjzIby1v8nmuAMYuNzqQG78NvNz", "Music Video Edit 2", "3D", false),
    dr("1mILDFDWrzQKWi_mLFQItUHfPlIbEDDqz", "Music Video Edit 1", "AI", false),
    dr("11WlXkJuE5jWgC_Ob1I38R3IubIBs2UP5", "Music Video 3", "AI", false),
    dr("1bDLQPE8_Dlm1SXdQGKprmqS2G5oIETGl", "Music Video 2", "AI", false),
    dr("1OD1-xp7GvFcey68WOLOjsY0b-dCJAM0T", "Music Video 1", "3D", false),
    { ...dr("1v7X-57LmZgb98f_b4lk1PXEpuTK6FRIR", "Mixtrap Version 1", "3D", false), thumb: mixtrapThumb, vertical: true },
    dr("1Qloh4FPUV4R_fAah3If17yjzHgr4PXpU", "Memories Together", "Editing", false),
    dr("17bAe16n5l_cdXh8rUTxZIcrit9A7NPMA", "Lyric Video", "Lyric", false),
    dr("1VweRgOeq-eH4xcBwuPYukKLopyIT0wms", "Gig Kimi", "2D", false),
    dr("1DsWThcdNuALSirXTErgPByuWe6f1CmvX", "Delta Blues Outlaws", "3D", false),
    dr("1V4vzxLwsDF3VQPfXY68WrZHDLhl6dtzQ", "Confetti", "Editing", false),
    dr("1A18q9DrOZP6RTpr72VKYzvcHJhaeVhz2", "Chevy Song", "Editing", false),
    dr("1fs1cjjHNoj0JpKIFVWTlG6gmJM_NhUtw", "Anime Music Video", "2D", false),
    { ...dr("1GiA_H2fHkTdGUhUxBLkVFddclUAahqZF", "30 Seconds Demo", "Editing", false), thumb: thirtySecondsDemoThumb },
    dr("1W9ScQJBCW7kWwLcjo_l7Qt2vR5Pri8YN", "3D Music Video", "3D", false),
  ];
}

/** Other videos from the same Drive folder: portfolio only, not on the home page. */
function MORE_FROM_SELECTED_FOLDER(): Project[] {
  return [
    dr("15u5laDcjF0eI2hSVm5ObTWWWlOqQlaO6", "Music Video Edit", "Editing", false),
    dr("1XZ4WEEweSdHHcuwwGo28S2mG8cuyQP6b", "Music Video", "Editing", false),
    dr("1zSE2mJIyQbAcVI3qp7sKNwFuVO6aksu6", "Summer Sounds Anthem", "3D", false),
    dr("1pktvyad0aWlyvGX220l8rSdmWloX6mtT", "You're the Spark", "AI", false),
  ];
}

/** Home page "Selected works": exactly the videos from the Selected works Drive folder (max 15). */
export const homeSelectedWorks = () => {
  const ids = SELECTED_WORKS_DRIVE().map((p) => p.id);
  return ids.map((id) => PROJECTS.find((p) => p.id === id)!).slice(0, 15);
};

// YouTube @prodby74 — 3D work only; videos YouTube labels as altered/synthetic (AI) are excluded.
export const PROJECTS: Project[] = [
  // Google Drive "Selected works" folder — newest work first
  ...SELECTED_WORKS_DRIVE(),
  ...MORE_FROM_SELECTED_FOLDER(),
  yt("GxrvbGWbQkA", "Cinematic Music Video"),
  yt("G0yyBi3nE68", "Cinematic Music Video II"),
  yt("R01jIXRq04Q", "Music Video", "Delta Blues Outlaws"),
  yt("2K9uwPJVoPk", "Official Visualizer"),
  yt("Dnci8iJ7VrY", "Cinematic Music Video III"),
  yt("0DcF8TQQWDk", "Music Video I"),
  yt("RushHt2nisM", "Music Video II"),
  yt("fgimFUzczLo", "Music Video III"),
  yt("WtOfuXSLuOM", "Animated Music Visual"),
  yt("jfPsQLVv9ts", "Animated Music Visual II"),
  // Google Drive "Music Video / Lyrics" folder
  ...MUSIC_VIDEOS_DRIVE(),
  // Google Drive portfolio folder
  dr("1_IGwbghujXYO-KIabCilEwL6dWjBonLV", "Action Animated Video", "2D"),
  dr("1NrKF0ApNXIAxS_rC_rfUVf3n7fDl1Z4j", "Arecia", "Editing"),
  dr("1DbI5Kh2csj6QOdoDNdByHat2cqQSkNDI", "Abstract Laboratory", "AI"),
  dr("19pnu9BxabRXpZbDLdityLVZL9B6nw8AA", "AI Advisor Character", "AI"),
  dr("15eEdH5UUoTj6p3kKt0L8oAuTJyTZnhDT", "AI Clothing Showcase", "UGC"),
  dr("1-D6hqRa1gsfsqNK-nEAXis1HMnkpepdL", "Gym Ad", "UGC"),
  dr("16pkBRSoyGmHsap7wSCjj-BVyUt7PLS1f", "Model Beauty Spot", "UGC"),
  dr("1jGnCpgXgWZSuTEYkFTxCBxl07vTIh0uD", "Perfume Demo", "UGC"),
  dr("1BowAZtdkHpog4zDNIcuKQulWKtG3BaAI", "Bottle Talking Head", "UGC"),
  dr("1Gnr9R3_9ohQP3gyExMJ2J9DM5F8_Tgww", "Course Promo", "UGC"),
  dr("1V7Efod21qoiC8ikge85VQ4vkMug9BeeQ", "App Demo", "UGC"),
  dr("1A_4N1XP6H9wPLcG7QV8qeH9e9p0fp2hH", "Web App Demo", "UGC"),
  dr("1raHa1FEbHiDXOPcJO0BQxdwR-tRlOFui", "Shopify Store Demo", "UGC"),
  dr("1JEr_-rfrY1oVWD-e7PNfG2sIDON-F63S", "Product Demo", "UGC"),
];

export const DRIVE_FOLDERS = [
  { title: "Music Video / Lyrics", id: "1jnPmNC-ADYZ00xZuex3sH-VwAM_I7HjV" },
  { title: "Direct Response Video Ads", id: "1n7bLGZLTPRm3-7ruJVRhvpOg7iL_hSPD" },
  { title: "DTC Meta Videos", id: "1E7etsjPnLWSzMMhKp_DkcbfyhF_2KXJ9" },
  { title: "E-commerce Meta Ads", id: "1EBOaP2IRKL6YnKdn93JqEIwsTWZhWt7u" },
  { title: "Fashion Product Videos", id: "1o_fMDDmJHwHpSX8MeLtWjveROW3xQ2jD" },
  { title: "SaaS Ad Videos", id: "10YXH7-R_JMJQcK4Wy4PIHb1n-Ms2S6St" },
  { title: "Skincare UGC", id: "1sv5w9fEkEKyiOHW2Iyw9PU-8v_MZ4bCl" },
  { title: "Realistic AI Video", id: "1_djpe5dLTDfeAsb7OSTstbBhuE3X5fBF" },
  { title: "Art Designs", id: "1FvhMqp1kCt57y8L7ULgZFtiS4Jq99Dza" },
];

export const thumbUrl = (p: Project) =>
  p.thumb ? p.thumb : p.source === "youtube"
    ? `https://i.ytimg.com/vi/${p.videoId}/hqdefault.jpg`
    : `https://drive.google.com/thumbnail?id=${p.videoId}&sz=w800`;

export const embedUrl = (p: Project) =>
  p.source === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${p.videoId}?autoplay=1&rel=0`
    : `https://drive.google.com/file/d/${p.videoId}/preview`;

export const byCategory = (c: Category) => PROJECTS.filter((p) => p.category === c);

/** Service page that describes each portfolio category, used to link projects to their service. */
export const SERVICE_ROUTE: Record<Category, "/music-videos" | "/video-editing" | "/ugc-ads"> = {
  AI: "/music-videos",
  "2D": "/music-videos",
  "3D": "/music-videos",
  Lyric: "/music-videos",
  Editing: "/video-editing",
  UGC: "/ugc-ads",
};
