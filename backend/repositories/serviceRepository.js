const Service = require("../models/serviceModel");

const createService = async (data) => {
   const service = new Service(data);
   return await service.save();
};

const findAllServices = async () => {
   return await Service.find().populate("createdBy", "firstName lastName email");
};

const findServiceById = async (id) => {
   return await Service.findById(id).populate("createdBy", "firstName lastName email");
};

const deleteService = async (id) => {
   return await Service.findByIdAndDelete(id);
};

const updateService = async (id, data) => {
   return await Service.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
   createService,
   findAllServices,
   findServiceById,
   deleteService,
   updateService
};
