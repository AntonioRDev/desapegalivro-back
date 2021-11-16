import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRegisterDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getById(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                address: true
            }
        });
    }

    async create(userRegisterDto: UserRegisterDto) {
        const { name, email, password, phone, whatsapp, postalCode, street, city, neighborhood, number, state, uf } = userRegisterDto;

        const response = await this.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                phone: phone,
                whatsapp: whatsapp,
                address: {
                    create: {
                        postalCode: postalCode,
                        street: street,
                        city: city,
                        neighborhood: neighborhood,
                        number: number,
                        state: state,
                        uf: uf
                    }
                }
            }
        });

        return response;
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findFirst({ 
            where: {
                email: email
            }
        })
    }
}
