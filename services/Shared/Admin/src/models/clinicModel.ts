import moongoose from 'mongoose';

export interface IClinic extends moongoose.Document {
    name: string;
    description: string;
    operatingHours: string;
    doctors: string[],
    services: [moongoose.Schema.Types.ObjectId],
}

const clinicSchema = new moongoose.Schema({
  name: {
    type: String,
    required: [true, 'A clinic must have a name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'A clinic description must have less or equal then 200 characters'],
  },
  operatingHours: {
    type: String,
    trim: true,
  },
  doctors: {
    type: [String],
    trim: true,
  },
  services: [
    {
      type: moongoose.Schema.Types.ObjectId,
      ref: 'ClinicService',
    },
  ]
});

const Clinic = moongoose.model<IClinic>('Clinic', clinicSchema);

export default Clinic;
