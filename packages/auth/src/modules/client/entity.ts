import {
	BeforeInsert,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Generated,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('clients')
export class Client {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	name: string;

	@Column()
	@Generated('uuid')
	key: string;

	@Column('text')
	secret: string;

	@BeforeInsert()
	async hashSecret(): Promise<void> {
		this.secret = await bcrypt.hash(this.secret, 10);
	}
	async compareSecret(attempt: string): Promise<boolean> {
		return await bcrypt.compare(attempt, this.secret);
	}
	async generateJWTPayload() {
		return {
			'https://hasura.io/jwt/claims': {
				'x-hasura-allowed-roles': ['client'],
				'x-hasura-default-role': 'client',
				'x-hasura-client-id': this.id,
			},
		};
	}
}
