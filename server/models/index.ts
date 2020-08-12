import { User, UserDoc } from "./user.model";
import { Model } from 'mongoose';

interface Database { user: Model<UserDoc>; }

const db: Database = { user: User };

export { db, UserDoc };