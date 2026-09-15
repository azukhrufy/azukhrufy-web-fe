const { object, string, date } = require("yup");

const createUpdateCompanies = object().shape({
  name: string().trim().required("Company name is required"),
  role: string().trim(),
  description: string().trim(),
  startDate: date()
    .typeError("Start date must be a valid date")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  endDate: date()
    .typeError("End date must be a valid date")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .test(
      "after-start-date",
      "End date cannot be earlier than start date",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return new Date(value) >= new Date(startDate);
      },
    ),
});

const companiesValidators = {
  createUpdateCompanies,
};

export default companiesValidators;
