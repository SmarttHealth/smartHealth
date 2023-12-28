const db = require("../models/db")
const Service = require("../models/service.model")
const ObejectId = require("mongoose").Types.ObjectId
const Doctor = require("../models/medecin.model")

exports.findAll = (req, res) =>{
    Service.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.findService = (req, res) => {
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else
        Service.findById(req.params.id)
        .then(data => {
            if (data)
                res.send(data)
            else
                res.status(404).json({
                    error: 'no record with given_id : '+ req.params.id
            })
            })
        .catch(err => console.log(err))
}

exports.addService = (req, res) => {
    if(req.body === null)
        res.status(400).json({
        error:'given user null'
        })
    else
        Service.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => console.log(err))
}

exports.updateService = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else
        Service.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
}

exports.deleteService = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        Service.findByIdAndDelete(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    }
}
exports.findDoctorsForService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({
        error: 'Given Object ID is not valid: ' + serviceId,
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        error: 'No record with the given ID: ' + serviceId,
      });
    }

    const doctors = await Doctor.find({ _id: { $in: service.medecins } });

    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors for service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};
exports.findServicesForDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    if (ObejectId.isValid(doctorId)) {
      return res.status(400).json({
        error: 'Given Object ID is not valid: ' + doctorId,
      });
    }

    // Utilisez l'ID du médecin pour récupérer les services associés
    const services = await Service.find({ medecins: ObejectId(doctorId) });

    res.json(services);
  } catch (error) {
    console.error('Error fetching services for doctor:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};