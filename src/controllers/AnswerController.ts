import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';

class AnswerController {
    public async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { id } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        const findedSurveyUser = await surveysUsersRepository.findOne({ where: { id: String(id) } });

        if(!findedSurveyUser) {
            return response.json({ error: 'Survey user doas not found.' }).status(404);
        }

        findedSurveyUser.value = Number(value);

        await surveysUsersRepository.save(findedSurveyUser);

        return response.json(findedSurveyUser).status(200);
    }
}

export default AnswerController;