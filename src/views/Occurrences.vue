<template>
  <div class="p2">
    <filters
      v-model="filters"
      v-bind:display="displayedFilters"
      class="p3"
    />
    <div>
      <table class="full-width">
        <thead>
          <th>
            Projeto/Lead
          </th>
          <th>
            Responsavel
          </th>
          <th>
            Status
          </th>
          <th>
            Ocorrencia
          </th>
          <th>
            Data
          </th>
        </thead>
        <tbody>
          <tr
            v-for="oc in occurrences"
            v-bind:key="oc.id"
          >
            <!-- Name -->
            <td>
              <div class="p4">
                <div
                  v-bind:class="oc.entity.type === 'project' ? 'project-cell' : 'lead-cell'"
                  class="oc-table__name"
                >
                  <template v-if="oc.entity.type === 'project'">
                    <div class="project__image">
                      <img
                        v-if="oc.entity.image"
                        v-bind:src="oc.entity.image"
                        width="140px"
                      />
                    </div>
                    <div class="project__name pl6">
                      <p>{{ oc.entity.name }}</p>
                      <div v-if="oc.entity.simulation">
                        <p><strong>Simulacao</strong></p>
                        <p>{{ oc.entity.simulation.value }}</p>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="lead__name">
                      {{ oc.entity.name }}
                    </div>
                    <div class="lead__image">
                      <img
                        v-if="oc.entity.image"
                        v-bind:src="oc.entity.image"
                        width="50px"
                        height="50px"
                      />
                    </div>
                  </template>
                </div>
              </div>
            </td>

            <!-- Responsible -->
            <td>
              <div class="p4">
                <div class="oc-table__user-responsible p6">
                  <div v-bind:class="oc.entity.type === 'project' ? 'project-cell' : 'lead-cell'">
                    <div class="user-image">
                      <img
                        v-if="getUser(oc.entity.user.id).image"
                        v-bind:src="getUser(oc.entity.user.id).image"
                        width="50px"
                        height="50px"
                      />
                    </div>
                    <div>
                      <p>
                        {{ getUser(oc.entity.user).user.name }}
                      </p>
                      <p>
                        <strong>{{ getUser(oc.entity.user).role.name }}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </td>

            <!-- Status -->
            <td>
              <div v-bind:class="oc.entity.type === 'project' ? 'project-cell' : 'lead-cell'">
                <div
                  v-bind:class="getStatus(oc.entity.status).color"
                  class="status__name"
                >
                  {{ getStatus(oc.entity.status).name }}
                </div>
                <div
                  v-bind:class="getStatus(oc.entity.status).color"
                  class="status__step"
                >
                  {{ getStatusStep(oc.entity.status).name }}
                </div>
              </div>
            </td>

            <!-- Description -->
            <td>
              <div v-bind:class="oc.entity.type === 'project' ? 'project-cell' : 'lead-cell'">
                <p>
                  {{ oc.description }}
                </p>
              </div>
            </td>

            <!-- Date -->
            <td>
              <div v-bind:class="oc.entity.type === 'project' ? 'project-cell' : 'lead-cell'">
                <p class="date-info">
                  {{ oc.created_at }}
                </p>
                <router-link
                  class="medium-size"
                  v-bind:to="{ name: 'project.view', props: { id: oc.entity.id } }"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/Filters.vue';

import getOccurrences from '@/services/occurrences';
import getAllUsers from '@/services/users';
import getAllRoles from '@/services/roles';
import getAllStatus from '@/services/status';

export default {
  name: 'Occurrences',
  components: {
    Filters,
  },
  data() {
    return {
      occurrences: [],

      loading: true,
      displayedFilters: {
        search: true,
        fields: ['userRole', 'entityStatus'],
        entityType: true,
        order: true,
      },
      filters: {
        search: null,
        fields: {
          userRole: '',
          entityStatus: '',
        },
        entityType: {
          projects: true,
          leads: true,
        },
        order: 'asc',
      },

      users: [],
      roles: [],
      status: [],
    };
  },
  watch: {
    filters: {
      handler() {
        this.getOccurrences()
          .finally(() => {
            this.loading = false;
          });
      },
      deep: true,
    },
  },
  created() {
    Promise.all([
      this.getOccurrences(),
      this.getStoreValues(),
    ])
      .finally(() => {
        this.loading = false; // Ideally at store
      });
  },
  methods: {
    getOccurrences() {
      this.loading = true;

      return getOccurrences(this.filters)
        .then((result) => {
          this.$set(this, 'occurrences', result);
        })
        .catch((error) => {
          // Ideally we would use some error message function to signal the user
          console.error(error); // eslint-disable-line
        });
    },
    // This would ideally be saved at the store
    getStoreValues() {
      this.loading = true;

      return Promise.all([
        getAllUsers(),
        getAllRoles(),
        getAllStatus(),
      ])
        .then(([
          users,
          roles,
          status,
        ]) => {
          this.users = users;
          this.roles = roles;
          this.status = status;
        });
    },
    getUser({ id, role }) {
      let user = this.users.find(u => u.id === id);
      user = user || {};

      let foundRole = this.roles.find(r => r.id === role);
      foundRole = foundRole || {};

      return { user, role: foundRole };
    },
    getStatus({ id }) {
      const status = this.status.find(s => s.id === id);
      return status || {};
    },
    getStatusStep({ id, step }) {
      const status = this.getStatus({ id });

      const foundStep = (status.steps || []).find(st => st.id === step);
      return foundStep || {};
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse:separate;
  border-spacing:0 8px;
}

th {
  color: #a3008b;
}

td {
  background: #FFFFFF;
  font-size: 14px;
  text-align: left;
}

.project-cell {
  max-height: 100px;
  overflow-y: hidden;
}

.lead-cell {
  max-height: 70px;
  overflow-y: hidden;
}

.oc-table__name {
  display: flex;
  align-items: flex-end;
  width: 300px;
}

.project__name {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.oc-table__user-responsible {
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

p {
  margin: 0 0;
}

.date-info {
  white-space: nowrap;
}
</style>
