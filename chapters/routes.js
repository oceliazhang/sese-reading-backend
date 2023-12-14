import * as dao from "./dao.js";

function ChapterRoutes(app) {

  //新建章 post
  const createChapter = async (req, res) => {
    const chapter = await dao.createChapter(req.body);
    res.json(chapter);
  };

  //找出一本书所有章节（参数：bookId） get
  const findAllChaptersForOneBook = async (req, res) => {
    const chaptersForOneBook = await dao.findAllChaptersForOneBook(req.params.bookId);
    res.json(chaptersForOneBook);
  };

  //找出一本书所有章节（参数：bookId）（排序版）get
  const findAllChaptersForOneBookSorted = async (req, res) => {
    const chaptersForOneBookSorted = await dao.findAllChaptersForOneBookSorted(req.params.bookId);
    res.json(chaptersForOneBookSorted);
  };

  //找到单章 （参数：bookId，chapterNumber）get
  const findOneChapterInABook = async (req, res) => {
    const oneChapterInABook = await dao.findOneChapterInABook(req.params.bookId, req.params.chapterNumber);
    res.json(oneChapterInABook);
  };
  //找到单章 （参数：chapterId）get
  const findOneChapter = async (req, res) => {
    const oneChapter = await dao.findOneChapter(req.params.chapterId);
    res.json(oneChapter);
  };

  //删除单章（参数：chapterId)
  const deleteChapter = async (req, res) => {
    const status = await dao.deleteChapter(req.params.chapterId);
    res.json(status);
  };

  //修改文章（参数)
  const updateChapterContent = async (req, res) => {
    const chapter = req.body;
    const status = await dao.updateChapterContent(req.params.chapterId, chapter);
    res.json(status);
  };

  //测试用函数 get
  const testChapter = async (req, res) => {
    res.send(`welcome testChapter!!!`);
  };
  app.get("/api/chapters/testChapters", testChapter);


  //API集合
  app.post("/api/chapters/createnewchapter", createChapter);
  app.get("/api/chapters/allchaptersinbook/:bookId", findAllChaptersForOneBook);
  app.get("/api/chapters/allchaptersinbooksorted/:bookId", findAllChaptersForOneBookSorted);
  app.get("/api/chapters/onechapterinbookwithchapternumber/:bookId/:chapterNumber", findOneChapterInABook);

  app.get("/api/chapters/onechapterinbook/:chapterId", findOneChapter);
  app.put("/api/chapters/updatechapter/:chapterId", updateChapterContent);
  app.delete("/api/chapters/deletechapter:chapterId", deleteChapter);
}
export default ChapterRoutes;
