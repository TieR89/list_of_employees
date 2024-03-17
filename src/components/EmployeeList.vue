<template>
  <div>
    <v-text-field
      v-model="searchQuery"
      label="Поиск сотрудника"
      placeholder="Например: Иванов Иван"
    >
    </v-text-field>
    <div class="employee-tags">
      <v-chip
        v-for="tag in tags"
        :key="tag.id"
        :color="selectedTags.includes(tag.id) ? tag.color : ''"
        :class="{ 'text-white': selectedTags.includes(tag.id), 'grey--text': !selectedTags.includes(tag.id), 'tag-margin': index !== 0 }"
        @click="toggleTag(tag.id)"
      >
        {{ tag.title }}
      </v-chip>
    </div>
    <v-list>
      <v-list-item
        v-for="(employee, index) in filteredEmployees.slice(0, visibleEmployees)"
        :key="employee.id"
      >
        <EmployeeListItem :employee="employee" />
      </v-list-item>
    </v-list>
    <v-btn v-if="visibleEmployees < filteredEmployees.length" @click="showMore">
      Показать еще
    </v-btn>
  </div>
</template>

<script>
import EmployeeListItem from './EmployeeListItem.vue';
import tags from '../data/tags';

export default {
  components: {
    EmployeeListItem
  },
  props: {
    employees: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tags,
      searchQuery: '',
      selectedTags: [],
      visibleEmployees: 4
    };
  },
  computed: {
    filteredEmployees() {
      let filtered = this.employees;

      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter((employee) =>
          `${employee.full_name} ${employee.inn}`
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      }

      // Filter by selected tags
      if (this.selectedTags.length > 0) {
        filtered = filtered.filter((employee) =>
          this.selectedTags.includes(employee.status.tag_id)
        );
      }

      return filtered;
    }
  },
  methods: {
    toggleTag(tagId) {
      const index = this.selectedTags.indexOf(tagId);
      if (index === -1) {
        this.selectedTags.push(tagId);
      } else {
        this.selectedTags.splice(index, 1);
      }
    },
    showMore() {
      this.visibleEmployees += 4;
    }
  }
};
</script>

<style scoped>
.employee-tags .v-chip {
  background-color: #e0e0e0; 
}
.tag-margin {
  margin-right: 8px;
}
</style>
