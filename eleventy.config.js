import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (cfg) {
  cfg.addPlugin(HtmlBasePlugin);
  cfg.addPassthroughCopy({ "src/images": "images", "src/assets": "assets", "src/admin": "admin", "src/files": "files", "src/CNAME": "CNAME" });
  cfg.addCollection("products", (c) => c.getFilteredByGlob("src/products/*.md").sort((a, b) => (a.data.order || 0) - (b.data.order || 0)));
  cfg.addCollection("cases", (c) => c.getFilteredByGlob("src/cases/*.md").sort((a, b) => String(b.data.sort).localeCompare(String(a.data.sort))));
  cfg.addCollection("notices", (c) => c.getFilteredByGlob("src/notices/*.md").sort((a, b) => b.date - a.date));
  cfg.addFilter("ytid", (u) => { if (!u) return ""; const m = String(u).match(/(?:youtu\.be\/|shorts\/|v=)([\w-]{6,})/); return m ? m[1] : ""; });
  cfg.addFilter("ymd", (d) => { const x = new Date(d); return `${x.getFullYear()}.${String(x.getMonth() + 1).padStart(2, "0")}.${String(x.getDate()).padStart(2, "0")}`; });
  cfg.addFilter("where", (arr, k, v) => (arr || []).filter((i) => i.data[k] === v));
  cfg.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  cfg.addFilter("year", () => new Date().getFullYear());
  cfg.addGlobalData("build", () => Date.now().toString(36));
  return { pathPrefix: process.env.PATH_PREFIX || "/", dir: { input: "src", output: "_site", includes: "_includes", data: "_data" }, markdownTemplateEngine: "njk", htmlTemplateEngine: "njk" };
}
