import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';

class NPSController {
    public async execute(request: Request, response: Response) {
        const { survey_id } = request.params;
        
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysAwnsers = await surveysUsersRepository.find({
            where: {
                survey_id,
                value: Not(IsNull()),
            }
        });

        const detractor = surveysAwnsers.filter(survey => survey.value >= 0 && survey.value <= 6).length;

        const passive = surveysAwnsers.filter(survey => survey.value >= 7 && survey.value <= 8).length;

        const promotors = surveysAwnsers.filter(survey => survey.value >= 9 && survey.value <= 10).length;
    
        const totalAnswers = surveysAwnsers.length;

        const result = ((promotors - detractor) / totalAnswers) * 100;

        return response.json({
            detractor,
            passive,
            promotors,
            totalAnswers,
            nps: result.toFixed(2),
        }).status(200);
    }
}

export default NPSController;