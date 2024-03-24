import { cityService } from "../services";

export default class {
  constructor() {
    this.service = cityService;
  }

  create = async (req, res, next) => {
    const { body } = req;
    const { id } = await this.service.createOne(body).catch((err) => next(err));

    return res.status(201).json({ id });
  };

  findAll = async (_req, res, next) => {
    const cities = await this.service.findAll().catch((err) => next(err));
    return res.json(cities);
  };

  findOne = async (req, res, next) => {
    const { id } = req.params;
    const city = await this.service.findById(id).catch((err) => next(err));

    if (!city) {
      return res.sendStatus(404);
    }
    return res.json(city);
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
    const [result] = await this.cities
      .delete(req.params.id)
      .catch((err) => next(err));
    if (!result.affectedRows) {
      return res.json(404);
    }
    return res.sendStatus(204);
  };
}
