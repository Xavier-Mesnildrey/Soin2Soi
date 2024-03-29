import { userService } from "../services";

export default class {
  constructor() {
    this.service = userService;
  }

  create = async (req, res, next) => {
    const { body } = req;
    await this.service.createOne(body).catch((err) => next(err));

    return next();
  };

  findAll = async (_req, res, next) => {
    const users = await this.service.findAll().catch((err) => next(err));

    return res.json(users);
  };

  findOne = async (req, res, next) => {
    const { id } = req.params;
    const user = await this.service.findById(id).catch((err) => next(err));

    if (!user) {
      return res.sendStatus(404);
    }
    return res.json(user);
  };

  updateOne = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    const [result] = await this.service
      .updateById({ id, ...body })
      .catch((err) => next(err));

    if (!result.affectedRows) {
      return res.sendStatus(404);
    }

    return res.json(result);
  };

  deleteOne = async (req, res, next) => {
    const [result] = await this.users
      .delete(req.params.id)
      .catch((err) => next(err));

    if (!result.affectedRows) {
      return res.status(404);
    }

    return res.sendStatus(204);
  };
}
