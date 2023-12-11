import moongose from 'mongoose';

export interface IClinicService extends moongose.Document {
  name: string;
  description: string;
  price: number;
  clinicID: moongose.Schema.Types.ObjectId;
  doctors: string[];
}


const clinicServiceSchema = new moongose.Schema({
  name: {
    type: String,
    required: [true, 'A clinic service must have a name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'A clinic service description must have less or equal then 200 characters'],
  },
  clinicID: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: [true, 'A clinic service must have a clinic ID'],
  },
  price: {
    type: Number,
    required: [true, 'A clinic service must have a price'],
  },
  doctors: {
    type: [String],
    trim: true,
  },
});

const ClinicService = moongose.model<IClinicService>('ClinicService', clinicServiceSchema);

export default ClinicService;