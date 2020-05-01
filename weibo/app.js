/*
 * @Author: Peanut
 * @Description:  定时爬取微博热搜
 * @Date: 2020-05-01 11:28:52
 * @Last Modified by: Peanut
 * @Last Modified time: 2020-05-01 11:29:59
 */
const cheerio = require("cheerio");
const superagent = require("superagent");
const fs = require("fs");

const weiboURL = "https://s.weibo.com";
const hotSearch = weiboURL + "/top/summary?cate=realtimehot";

superagent.get(hotSearch, async (err, res) => {
  if (err) console.error(err);
  const $ = cheerio.load(res.text);
  let hotList = [];
  $("#pl_top_realtimehot table tbody tr").each(function (index) {
    if (index !== 0) {
      const $td = $(this).children().eq(1);
      const link = weiboURL + $td.find("a").attr("href");
      const text = $td.find("a").text();
      const hotValue = $td.find("span").text();
      const one = {
        index,
        link,
        text,
        hotValue,
      };
      hotList.push(one);
    }
  });
  await fs.writeFileSync(
    `${__dirname}/hotSearch.json`,
    JSON.stringify(hotList),
    "utf-8"
  );
});
