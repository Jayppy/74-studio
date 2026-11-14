import { describe, expect, it } from "vitest";
import { homeSelectedWorks, PROJECTS } from "@/lib/portfolio";

const FOLDER_ORDER = [
  "1H2ZflNjzIby1v8nmuAMYuNzqQG78NvNz", "1mILDFDWrzQKWi_mLFQItUHfPlIbEDDqz", "11WlXkJuE5jWgC_Ob1I38R3IubIBs2UP5",
  "1bDLQPE8_Dlm1SXdQGKprmqS2G5oIETGl", "1OD1-xp7GvFcey68WOLOjsY0b-dCJAM0T", "1v7X-57LmZgb98f_b4lk1PXEpuTK6FRIR",
  "1Qloh4FPUV4R_fAah3If17yjzHgr4PXpU", "17bAe16n5l_cdXh8rUTxZIcrit9A7NPMA", "1VweRgOeq-eH4xcBwuPYukKLopyIT0wms",
  "1DsWThcdNuALSirXTErgPByuWe6f1CmvX", "1V4vzxLwsDF3VQPfXY68WrZHDLhl6dtzQ", "1A18q9DrOZP6RTpr72VKYzvcHJhaeVhz2",
  "1fs1cjjHNoj0JpKIFVWTlG6gmJM_NhUtw", "1GiA_H2fHkTdGUhUxBLkVFddclUAahqZF", "1W9ScQJBCW7kWwLcjo_l7Qt2vR5Pri8YN",
];

describe("home Selected works", () => {
  it("shows only the 15 chosen Drive videos, in the chosen order", () => {
    expect(homeSelectedWorks().map((p) => p.videoId)).toEqual(FOLDER_ORDER);
  });
});

describe("portfolio", () => {
  it("includes the other 4 videos from the Selected works folder", () => {
    const ids = PROJECTS.map((p) => p.videoId);
    for (const id of ["15u5laDcjF0eI2hSVm5ObTWWWlOqQlaO6", "1XZ4WEEweSdHHcuwwGo28S2mG8cuyQP6b", "1zSE2mJIyQbAcVI3qp7sKNwFuVO6aksu6", "1pktvyad0aWlyvGX220l8rSdmWloX6mtT"]) {
      expect(ids).toContain(id);
    }
  });
});
