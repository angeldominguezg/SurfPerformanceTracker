import { describe, it, expect } from "vitest";
import { PrismaClient } from "@prisma/client";

describe("prisma schema", () => {
  it("exposes expected models", () => {
    const client = new PrismaClient();
    expect(client).toHaveProperty("spot");
    expect(client).toHaveProperty("report");
    expect(client).toHaveProperty("sourceReport");
    expect(client).toHaveProperty("sourceBlock");
    expect(client).toHaveProperty("consolidatedBlock");
    expect(client).toHaveProperty("session");
  });
});
