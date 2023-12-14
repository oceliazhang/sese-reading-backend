import chapterModel from "./model.js";

/**
 * 首先：这是对数据库的操作步骤，不包含其他逻辑
 * 
 * 这里包含以下函数
 * createChapter 新建章节，该章节内必须有bookInfo
 * findAllChaptersForOneBook 找到一本书的所有章节
 * findAllChaptersForOneBookSorted 全部章节排序版
 * findOneChapterInABook 找到特定书的特定章节
 */

//创建新章节
export const createChapter = (newChapter) => chapterModel.create(newChapter);

//找到一本书全部章节
export const findAllChaptersForOneBook = (bookId) => chapterModel.find({ bookInfo: bookId });

//全部章节排序版
export const findAllChaptersForOneBookSorted = (bookId) => {
  return chapterModel.find({ bookInfo: bookId }).sort({ chapterNumber: 1 });
};

//找到单章,有章节数
export const findOneChapterInABook = (bookId, chapterNumber) => 
chapterModel.findOne({ bookInfo: bookId, chapterNumber: chapterNumber });

//找到单章
export const findOneChapter = (chapterId) => 
chapterModel.findOne({ _id: chapterId});

//删除单章
export const deleteChapter = (userId) => chapterModel.deleteOne({ _id: userId });

//搜索句子，返回数据库内所有包含句子的章节
export const findChaptersByContent = (searchString) => {
  return chapterModel.find({ chapterContent: new RegExp(searchString, 'i') });
};

//搜索句子，返回数据库内所有包含句子的书
export const findBooksByChapterContent = (searchString) => {
  return chapterModel.aggregate([
    { $match: { chapterContent: new RegExp(searchString, 'i') } },
    { $group: { _id: "$bookInfo" } },
    { $project: { _id: 0, bookId: "$_id" } }
  ]);
};

//修改单章，修改一整个JSON
export const updateChapterContent = (chapterId, newChapter) => {
  return chapterModel.updateOne({ _id: chapterId }, { $set: newChapter });
};

//计算一本书内有多少章
export const countChaptersInBook = (bookId) => {
  return chapterModel.countDocuments({ bookInfo: bookId });
};

//计算一本书的总字数
export const sumOfChapterContentLength = async (bookId) => {
  const chapters = await chapterModel.find({ bookInfo: bookId }, 'chapterContent');
  return chapters.reduce((total, chapter) => total + (chapter.chapterContent.length || 0), 0);
};

//计算单章字数
export const countWordsInChapter = async (chapterId) => {
  const chapter = await chapterModel.findOne({ _id: chapterId }, 'chapterContent');
  if (!chapter || !chapter.chapterContent) {
    return 0; // 如果没有找到章节或章节没有内容，则返回0
  }
  return chapter.chapterContent.split(/\s+/).filter(Boolean).length;
};
