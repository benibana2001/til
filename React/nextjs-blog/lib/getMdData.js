import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const POST_DIRECTORY = path.join(process.cwd(), "pages/posts");
export const APP_DIRECTORY = path.join(process.cwd(), "pages/apps");

export function getSortedPostsDate(dir) {
  const fileNames = fs.readdirSync(dir);
  const allPostsData = fileNames
    .filter((filename) => filename.includes(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(dir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      /**
       * Use gray-matter to parse the post metadata section
       */
      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
      };
    });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      // keep original order
      return 0;
    }
  });
}

export function getAllPostIds(dir) {
  const fileNames = fs.readdirSync(dir);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

/**
 * mdの中身を取得
 * @param {number} id 
 * @returns 
 */
export async function getPostData(dir, id) {
  const fullPath = path.join(dir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // convert md int html string
  const processdContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processdContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
