import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveysRepository from '../repositories/SurveysRepository';

class SurveysController {
    public async index(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        const surveysFinded = await surveysRepository.find();

        return response.json(surveysFinded).status(200);
    }

    public async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const createdSurvey = await surveysRepository.create({
            title,
            description,
        });

        const savedSurvey = await surveysRepository.save(createdSurvey);

        return response.json(savedSurvey).status(201);
    }
}

export default SurveysController;