import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
    public async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getRepository(User);

        const userWithSameEmail = await usersRepository.findOne({ email });
        if(userWithSameEmail) {
            return response.json({ error: 'This email alread exists.' }).status(400);
        }

        const createdUser = await usersRepository.create({ 
            name,
            email,
        });

        const savedUser = await usersRepository.save(createdUser);

        return response.json(savedUser).status(200);
    }
}

export default UserController;