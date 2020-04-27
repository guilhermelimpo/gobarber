import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { user_id_provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();
  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    user_id_provider,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
