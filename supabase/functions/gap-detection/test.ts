import { assertEquals } from "https://deno.land/std@0.223.0/testing/asserts.ts";
import "./index.ts"; // ensure the server compiles

Deno.test("dummy", () => {
  assertEquals(true, true);
});
