import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import * as Yup from 'yup';
import AppError from '../Errors/AppError';

class UsersController {
    public async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required('O nome é obrigatório.'),
            email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório.'),
        });

        try {
            await schema.validate({ name, email }, {abortEarly: false});;
        } catch(error) {
            throw new AppError(error);
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userWithSameEmail = await usersRepository.findOne({ email });
        if(userWithSameEmail) {
            return response.json({ error: 'This email alread exists.' }).status(400);
        }

        const createdUser = await usersRepository.create({ 
            name,
            email,
        });

        const savedUser = await usersRepository.save(createdUser);

        return response.json(savedUser).status(201);
    }
}

export default UsersController;