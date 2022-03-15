import { Schema, model } from 'mongoose';
import OrganizationMongo from '../models/Organization';

export const OrganizationSchema = new Schema(OrganizationMongo);
export const Organization = model('Organization', OrganizationSchema);
export default class OrganizationStore {
  async createOrganization(attributes) {
    const {
      organizationName,
      userId,
      createdAt,
      bucketPrefix
    } = attributes;

    const newFields = {
      organizationName,
      userId,
      createdAt,
      bucketPrefix
    };

    let savedOrganization;
    const org = new Organization(newFields);

    try {
      savedOrganization = await org.save();
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrganizationStore.OPERATION_UNSUCCESSFUL());
    }

    return savedOrganization;

  }

  async saveSubscriptionId(organizationId, attributes) {
    let organization;
    try {
      organization = await Organization.findOneAndUpdate({ _id: organizationId }, attributes, { new: true });
      if (!organization) {
        return Promise.reject(new OrganizationStore.NOT_FOUND());
      }
    } catch (e) {
      // console.error(e);
      return Promise.reject(new OrganizationStore.OPERATION_UNSUCCESSFUL());
    }
    return organization;
  }


  async getOrganization(attributes) {
    let organization;
    try {
      organization = await Organization.findOne(attributes);
      if (!organization) {
        return Promise.reject(new OrganizationStore.NOT_FOUND());
      }
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrganizationStore.OPERATION_UNSUCCESSFUL());
    }
    return organization;
  }


}

OrganizationStore.OPERATION_UNSUCCESSFUL = class extends Error {
  constructor() {
    super('An error occured while processing the request.');
  }
};

OrganizationStore.NOT_FOUND = class extends Error {
  constructor() {
    super('Organization Not Found');
  }
};