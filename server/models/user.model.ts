import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';

const UserSchema = createSchema({
    username: Type.string({ required: true, unique: true }),
    email: Type.string({ required: true, unique: true }),
    password: Type.string({ required: true }),
});

const User = typedModel('User', UserSchema, 'users');

export type UserDoc = ExtractDoc<typeof UserSchema>;
export { User };