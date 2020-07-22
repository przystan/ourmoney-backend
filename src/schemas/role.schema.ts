import mongoose from 'mongoose';
import { UserRoleName } from '../models/EnumTypes/UserEnumTypes';

const Role = mongoose.model(
    'Role',
    new mongoose.Schema({
        name: String
    })
);

export const ROLES: Array<UserRoleName> = [UserRoleName.ADMIN, UserRoleName.CLIENT];

export default Role;
