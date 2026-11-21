import { describe, expect, it } from "vitest";
import { contactSchema } from "@/routes/contact";
import { SERVICES } from "@/lib/site";

const inquiry = { name: "Service validation test", email: "test@example.com", description: "Visual direction for an upcoming single release." };

describe("Music service inquiries", () => {
  it("accepts and retains the exact human-designed artwork selection", () => {
    const service = "Album Cover Artwork (Non-AI / Human-Designed)";
    expect(contactSchema.parse({ ...inquiry, service }).service).toBe(service);
  });
  it("accepts and retains the exact three-deliverable release selection", () => {
    const service = "Complete Single Release Promo Content (Cover Art + Music Video + Short Promo Visualizer)";
    expect(contactSchema.parse({ ...inquiry, service }).service).toBe(service);
  });
  it.each(["AI Music Video", "2D Animation", "3D Music Video", "Lyric Video", "Short-Form/Long-Form Editing", "UGC/Product Ads", "Custom Project"])("preserves the existing %s option", (service) => {
    expect(SERVICES).toContain(service);
    expect(contactSchema.parse({ ...inquiry, service }).service).toBe(service);
  });
  it("still rejects an unsupported service", () => {
    expect(contactSchema.safeParse({ ...inquiry, service: "Unknown service" }).success).toBe(false);
  });
});