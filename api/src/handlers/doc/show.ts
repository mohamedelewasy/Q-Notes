import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import DocModel from '../../models/doc.model';

// route:   GET /doc/
// access:  public
// query options = limit, page, orderBy, orderByRank, keyword, educationLevel
export const getDocList = asyncHandler(async (req, res) => {
  const limit = +(req.query.limit || 10);
  const page = +(req.query.page || 1);
  const offset = (page - 1) * limit;
  const orderBy = req.query.orderBy?.toString() || 'updatedAt';
  const orderByRank = req.query.orderByRank?.toString() || 'DESC';
  const keyWord = req.query.keyWord?.toString() || '';
  const educationLevel = req.query.educationLevel?.toString() || '';
  const documents = await DocModel.findAll({
    where: {
      title: { [Op.like]: `%${keyWord}%` },
      educationLevel: { [Op.like]: educationLevel ? `${educationLevel}` : '%%' },
    },
    attributes: [
      'id',
      'thumbnail',
      'description',
      'educationLevel',
      'className',
      'semester',
      'title',
      'updatedAt',
    ],
    limit,
    offset,
    order: [[orderBy, orderByRank]],
  });
  const documentsCount = await DocModel.count({
    where: {
      title: { [Op.like]: `%${keyWord}%` },
      educationLevel: { [Op.like]: educationLevel ? `${educationLevel}` : '%%' },
    },
  });
  res.status(200).json({ articles: documents, count: documentsCount });
});
