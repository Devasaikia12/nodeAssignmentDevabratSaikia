import Agency from '../models/Agency.js';
import Client from '../models/Client.js';

const createClientAgencyDetails = async (req, res) => {
  const agency_body = {
    name: req.body.agency_name,
    address1: req.body.agency_address1,
    state: req.body.agency_state,
    city: req.body.agency_city,
    phoneNumber: req.body.agency_phoneNumber,
  };
  try {
    const agency_data = await Agency.create(agency_body);
    const agencyData = {
      _id: agency_data._id,
      name: agency_data.name,
      address1: agency_data.address1,
      state: agency_data.state,
      city: agency_data.acity,
      phoneNumber: agency_data.phoneNumber,
    };
    if (agency_data) {
      const client_body = {
        agencyId: agency_data._id,
        name: req.body.client_name,
        email: req.body.client_email,
        phoneNumber: req.body.client_phoneNumber,
        totalBill: req.body.client_totalBill,
      };
      const client_data = await Client.create(client_body);
      const clientData = {
        _id: client_data._id,
        name: client_data.name,
        email: client_data.email,
        phoneNumber: client_data.phoneNumber,
        totalBill: client_data.totalBill,
      };
      //console.log(agencyData);
      //console.log(clientData);
      res.status(201).json({ ...agencyData, ...clientData });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateClientDetails = async (req, res) => {
  //const { agencyId, name, email, phoneNumber, totalBill } = req.body;
  console.log(req.body);
  console.log(req.params.clientId);
  try {
    const clientId = await Client.findByIdAndUpdate(
      req.params.clientId,
      req.body
    );
    res.status(201).json({ clientId });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getMaxTotalbill = async (req, res) => {
  try {
    const data = await Client.aggregate([
      {
        $lookup: {
          from: 'agencies',
          localField: 'agencyId',
          foreignField: 'agencyId',
          as: 'resultAgencies',
        },
      },
      { $unwind: '$resultAgencies' },
      {
        $sort: { totalBill: -1 },
      },
      { $limit: 5 },
      {
        $project: {
          AgencyName: '$resultAgencies.name',
          ClientName: '$name',
          TotalBill: '$totalBill',
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllDetails = async (req, res) => {
  try {
    const data = await Client.aggregate([
      {
        $lookup: {
          from: 'agencies',
          localField: 'agencyId',
          foreignField: 'agencyId',
          as: 'resultAgencies',
        },
      },
      { $unwind: '$resultAgencies' },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

export {
  createClientAgencyDetails,
  updateClientDetails,
  getMaxTotalbill,
  getAllDetails,
};
