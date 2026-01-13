import { UserRepository } from '../repositories/UserRepository';
import { TicketRepository } from '../repositories/TicketRepository';
import { PasswordHasher } from '../services/PasswordHasher';
import { TokenService } from '../services/TokenService';
import { LoginUseCase } from '../../application/auth/LoginUseCase';
import { RegisterUserUseCase } from '../../application/auth/RegisterUserUseCase';
import { CreateTicketUseCase } from '../../application/zeladoria/CreateTicketUseCase';
import { GetTicketByIdUseCase } from '../../application/zeladoria/GetTicketByIdUseCase';
import { GetUserTicketsUseCase } from '../../application/zeladoria/GetUserTicketsUseCase';
import { GetAllTicketsUseCase } from '../../application/admin/GetAllTicketsUseCase';
import { UpdateTicketStatusUseCase } from '../../application/admin/UpdateTicketStatusUseCase';
import { GetAllUsersUseCase } from '../../application/admin/GetAllUsersUseCase';

export class Container {
    private static instance: Container;

    public readonly userRepository: UserRepository;
    public readonly ticketRepository: TicketRepository;
    public readonly passwordHasher: PasswordHasher;
    public readonly tokenService: TokenService;
    public readonly loginUseCase: LoginUseCase;
    public readonly registerUserUseCase: RegisterUserUseCase;
    public readonly createTicketUseCase: CreateTicketUseCase;
    public readonly getTicketByIdUseCase: GetTicketByIdUseCase;
    public readonly getUserTicketsUseCase: GetUserTicketsUseCase;
    public readonly getAllTicketsUseCase: GetAllTicketsUseCase;
    public readonly updateTicketStatusUseCase: UpdateTicketStatusUseCase;
    public readonly getAllUsersUseCase: GetAllUsersUseCase;

    private constructor() {
        this.userRepository = new UserRepository();
        this.ticketRepository = new TicketRepository();
        this.passwordHasher = new PasswordHasher();
        this.tokenService = new TokenService();
        this.loginUseCase = new LoginUseCase(this.userRepository, this.passwordHasher, this.tokenService);
        this.registerUserUseCase = new RegisterUserUseCase(this.userRepository, this.passwordHasher, this.tokenService);
        this.createTicketUseCase = new CreateTicketUseCase(this.ticketRepository);
        this.getTicketByIdUseCase = new GetTicketByIdUseCase(this.ticketRepository);
        this.getUserTicketsUseCase = new GetUserTicketsUseCase(this.ticketRepository);
        this.getAllTicketsUseCase = new GetAllTicketsUseCase(this.ticketRepository);
        this.updateTicketStatusUseCase = new UpdateTicketStatusUseCase(this.ticketRepository);
        this.getAllUsersUseCase = new GetAllUsersUseCase(this.userRepository);
    }

    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }
}
