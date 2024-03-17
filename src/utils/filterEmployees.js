export default function filterEmployees(employees, filters) {
  let filteredEmployees = [...employees]

  if (filters.country) {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.country_id === filters.country.id
    )
  }

  if (filters.gender) {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.gender_id === filters.gender.id
    )
  }

  if (filters.position) {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.position_id === filters.position.id
    )
  }

  if (filters.contractTypes.length > 0) {
    filteredEmployees = filteredEmployees.filter((employee) =>
      filters.contractTypes.some((contractType) => contractType.id === employee.type_contract_id)
    )
  }

  return filteredEmployees
}
