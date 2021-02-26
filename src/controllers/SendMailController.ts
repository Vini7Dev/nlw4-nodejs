import path from 'path';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveysRepository from '../repositories/SurveysRepository';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';
import UsersRepository from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
    public async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const findedUser = await usersRepository.findOne({ where: { email } });

        if(!findedUser) {
            return response.json({ error: 'User not found.' }).status(404);
        }
        
        const findedSurvey = await surveysRepository.findOne({ where: { id: survey_id } });

        if(!findedSurvey) {
            return response.json({ error: 'Survey not found.' }).status(404);
        }

        const variables = {
            name: findedUser.name,
            title: findedSurvey.title,
            description: findedSurvey.description,
            user_id: findedUser.id,
            link: process.env.URL_MAIL,
        }
        
        const npsPath = path.resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

        const surveyAlreadExists = await surveysUsersRepository.findOne({
            where: [
                { user_id: findedUser.id }, { value: null },
            ],
            relations: ['user', 'survey'],
        });

        if(surveyAlreadExists) {
            await SendMailService.execute(email, findedSurvey.title, variables, npsPath);
            
            return response.json(surveyAlreadExists).status(201);
        } else {
            const createdSurveyUser = await surveysUsersRepository.create({
                user_id: findedUser.id,
                survey_id,
            });

            const savedSurveyUser = await surveysUsersRepository.save(createdSurveyUser);
            
            await SendMailService.execute(email, findedSurvey.title, variables, npsPath);

            return response.json(savedSurveyUser).status(201);
        }
    }
}

export default SendMailController;