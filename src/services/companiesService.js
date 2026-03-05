const {
  serviceGet,
  servicePost,
  servicePatch,
  serviceDelete,
} = require("./_factory");

const getListCompanies = (query, token) =>
  serviceGet(`/v1/companies`, query, token);

const createCompany = (payload, token) =>
  servicePost(`/v1/companies`, payload, token);

const updateCompany = (companyId, payload, token) =>
  servicePatch(`/v1/companies/${companyId}`, payload, token);

const deleteCompany = (companyId, token) =>
  serviceDelete(`/v1/companies/${companyId}`, token);

const companiesService = {
  getListCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
};

export default companiesService;
