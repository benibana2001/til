import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "pages/posts");

export function getSortedPostsDate() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((filename) => filename.includes(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
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

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

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
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
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
