import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ProvidersControllers from '../controllers/ProvidersControllers'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const providersRouter = Router()
const providersControllers = new ProvidersControllers()
const providerDayAvailabilityController =
  new ProviderDayAvailabilityController()
const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersControllers.index)
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index
)
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index
)

export default providersRouter
