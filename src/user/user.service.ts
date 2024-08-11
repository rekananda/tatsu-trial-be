import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Keypair } from '@solana/web3.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const keypair = Keypair.generate();
    const solanaWalletAddress = keypair.publicKey.toString();
    const solanaPrivateKey = JSON.stringify(Array.from(keypair.secretKey));

    return this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
        solanaWalletAddress,
        solanaPrivateKey,
      },
    });
  }

  async findUserById(id: string): Promise<Omit<Users, 'password' | 'solanaPrivateKey'> | null> {
    const user = await this.prisma.users.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    const { password, solanaPrivateKey, ...result } = user;
    return result;
  }

  async findUserByEmail(email: string): Promise<Omit<Users, 'password' | 'solanaPrivateKey'> | null> {
    const user = await this.prisma.users.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    const { password, solanaPrivateKey, ...result } = user;
    return result;
  }

  async findUserByWallet(solanaWalletAddress: string): Promise<Omit<Users, 'password' | 'solanaPrivateKey'> | null> {
    const user = await this.prisma.users.findFirst({ where: { solanaWalletAddress } });

    if (!user) {
      return null;
    }

    const { password, solanaPrivateKey, ...result } = user;
    return result;
  }

  async validateUserByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async updateUser(id: string, data: Prisma.UsersUpdateInput): Promise<Users> {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<Users> {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
