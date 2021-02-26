import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import Survey from './Survey';
import User from './User';

@Entity('surveys_users')
class SurveyUser {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    survey_id: string;
    
    @ManyToOne(() => Survey)
    @JoinColumn({ name: 'survey_id' })
    survey: Survey;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export default SurveyUser;