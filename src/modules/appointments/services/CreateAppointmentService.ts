import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
