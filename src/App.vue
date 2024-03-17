<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="8">
            <EmployeeList :employees="filteredEmployees" />
          </v-col>
          <v-col cols="4">
            <v-btn block color="primary"  class="my-4" @click="openAddEmployeeModal">
              Добавить нового сотрудника
            </v-btn>
            <FilterSidebar @apply-filters="applyFilters" />
          </v-col>
        </v-row>
      </v-container>
      <AddEmployeeModal v-model="showAddEmployeeModal" @employee-added="handleEmployeeAdded" />
    </v-main>
  </v-app>
</template>

<script>
import EmployeeList from './components/EmployeeList.vue';
import FilterSidebar from './components/FilterSidebar.vue';
import AddEmployeeModal from './components/AddEmployeeModal.vue';
import employees from './data/employees';
import filterEmployees from './utils/filterEmployees';

export default {
  components: {
    EmployeeList,
    FilterSidebar,
    AddEmployeeModal,
  },
  data() {
    return {
      showAddEmployeeModal: false,
      employees,
      filteredEmployees: employees
    };
  },
  methods: {
    openAddEmployeeModal() {
      this.showAddEmployeeModal = true;
    },
    handleEmployeeAdded(newEmployee) {
      this.employees.unshift(newEmployee);
      this.showAddEmployeeModal = false;
    },
    applyFilters(filters) {
      this.filteredEmployees = filterEmployees(this.employees, filters);
    }
  }
};
</script>
