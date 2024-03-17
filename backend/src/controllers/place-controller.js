import PlaceService from "../services/place-service";

export default class {
  constructor() {
    this.service = new PlaceService();
  }

  create = async (req, res, next) => {
    const { body } = req;
    const { id } = await this.service.createOne(body).catch((err) => next(err));

    res.status(201).json({ id });
  };

  findAll = async (req, res, next) => {
    const places = await this.service.findAll().catch((err) => next(err));
    res.json(places);
  };

  findOne = async (req, res, next) => {
    const { id } = req.params;
    const place = await this.service.findById(id).catch((err) => next(err));

    if (!place) {
      return res.sendStatus(404);
    }
    return res.json(place);
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
    const [result] = await this.places
      .delete(req.params.id)
      .catch((err) => next(err));

    if (!result.affectedRows) {
      return res.status(404);
    }

    return res.sendStatus(204);
  };
}
