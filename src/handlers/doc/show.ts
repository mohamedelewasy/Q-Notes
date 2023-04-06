import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import DocModel from '../../models/doc.model';

// route:   GET /doc/
// access:  public
// TODO: validate query options
// limit, page, orderBy, orderByRank
export const getDocList = asyncHandler(async (req, res) => {
  const limit = +(req.query.limit || 20);
  const page = +(req.query.page || 1);
  const offset = (page - 1) * limit;
  const orderBy = req.query.orderBy?.toString() || 'updatedAt';
  const orderByRank = req.query.orderByRank?.toString() || 'DESC';
  const keyWord = req.query.keyWord?.toString() || '';
  const documents = await DocModel.findAll({
    where: { title: { [Op.like]: `%${keyWord}%` } },
    attributes: [
      'id',
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
  const documentsCount = await DocModel.count({ where: { title: { [Op.like]: `%${keyWord}%` } } });
  res.status(200).json({ articles: documents, count: documentsCount });
});
