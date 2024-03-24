import { careService } from "../services";

export default class {
  constructor() {
    this.service = careService;
  }

  create = async (req, res, next) => {
    const { body } = req;
    const { id } = await this.service.createOne(body).catch((err) => next(err));

    return res.status(201).json({ id });
  };

  // Nous n'utilisons que celui la pour le site
  findAll = async (req, res, next) => {
    const { conditionId, cityId } = req.query;

    const cares = await this.service
      .findAll(conditionId, cityId)
      .catch((err) => next(err));
    return res.json(cares);
  };

  findOne = async (req, res, next) => {
    const { id } = req.params;
    const care = await this.service.findById(id).catch((err) => next(err));

    if (!care) {
      return res.sendStatus(404);
    }
    return res.json(care);
  };

  updateOne = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    const result = await this.service
      .updateById({ id, ...body })
      .catch((err) => next(err));

    if (!result.affectedRows) {
      return res.sendStatus(404);
    }

    return res.json(result);
  };

  deleteOne = async (req, res, next) => {
    const result = await this.cares
      .delete(req.params.id)
      .catch((err) => next(err));

    if (!result.affectedRows) {
      return res.status(404);
    }

    return res.sendStatus(204);
  };
}
