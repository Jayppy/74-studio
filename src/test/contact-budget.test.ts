import { describe, expect, it } from "vitest";

import { contactSchema } from "@/routes/contact";

// A submission that passes every required field, so each case below only varies the budget.
const valid = {
  name: "Lukas Camilo",
  email: "bassemandlukas@gmail.com",
  service: "AI Music Video",
  description: "A 3D visualiser for my single, dark and gritty.",
};

describe("Contact form budget field", () => {
  it("keeps the budget the artist typed", () => {
    const parsed = contactSchema.safeParse({ ...valid, budget: "under $500" });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.budget).toBe("under $500");
  });

  it("accepts a submission with no budget given", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, budget: "   " }).success).toBe(true);
  });

  it("rejects a budget longer than 120 characters", () => {
    expect(contactSchema.safeParse({ ...valid, budget: "x".repeat(121) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, budget: "x".repeat(120) }).success).toBe(true);
  });
});
