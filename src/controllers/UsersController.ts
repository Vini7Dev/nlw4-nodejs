import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

class UsersController {
    public async create(request: Request, response: Response) {
        const { name, email } = request.body;

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