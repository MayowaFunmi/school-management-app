import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String, required: true, unique: true
    }
}, { timestamps: true });

export const RoleModel = mongoose.model('Role', roleSchema);
export const getRoles = () => RoleModel.find();
export const getRoleByName = (roleName: string) => RoleModel.findOne({ roleName });
export const createRole = (roleName: string) => new RoleModel({ roleName })
    .save().then((role) => role.toObject());
export const deleteRoleByName = (name: string) => RoleModel.findOneAndDelete({ roleName: name });
export const updateRoleByName = (name: string) => RoleModel.findOneAndUpdate({ roleName: name });



// export const createUser = (values: Record<string, any>) => new UserModel(values)
//     .save().then((user) => user.toObject());