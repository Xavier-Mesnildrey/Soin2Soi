import ConditionService from "../services/condition-service";

export default class {
  constructor() {
    this.service = new ConditionService();
  }

  create = async (req, res, next) => {
    const { body } = req;
    const { id } = await this.service.createOne(body).catch((err) => next(err));

    return res.status(201).json({ id });
  };

  findAll = async (req, res, next) => {
    const conditions = await this.service.findAll().catch((err) => next(err));

    return res.json(conditions);
  };

  findOne = async (req, res, next) => {
    const { id } = req.params;
    const condition = await this.service.findById(id).catch((err) => next(err));

    if (!condition) {
      return res.sendStatus(404);
    }
    return res.json(condition);
  };

  updateOne = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    const result = await this.service
      .updateById({ id, ...body })
      .catch((err) => next(err));

    if (!result.affectedRows) {
      res.sendStatus(404);
    }

    return res.json(result);
  };

  deleteOne = async (req, res, next) => {
    const result = await this.conditions
      .delete(req.params.id)
      .catch((err) => next(err));

    if (result.affectedRows) {
      return res.status(404);
    }
    return res.sendStatus(204);
  };
}
