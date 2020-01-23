<template>
  <div>
    <div class="d-flex a-center j-between">
      <div v-if="display.search">
        <!-- TODO: utilize a buffer to only change after 500ms of no characters typed -->
        <input
          v-model="filters.search"
          type="text"
          class="medium-size"
        />
      </div>
      <div v-if="display.fields">
        <strong>Filtrar por</strong>
        <select
          v-for="fieldName in display.fields"
          v-bind:key="fieldName"
          v-model="filters.fields[fieldName]"
          placeholder=""
          class="medium-size ml7"
        >
          <option value="">
            {{ trl.fields[fieldName] }}
          </option>
          <option
            v-for="option in fieldsOptions[fieldName]"
            v-bind:key="option.id"
            v-bind:value="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
      <div>
        <p>Filtro avancado</p>
      </div>
    </div>
    <div class="d-flex a-center j-start">
      <div v-if="display.entityType" class="medium-size">
        <div class="ck-button">
          <label>
              <input
                v-model="filters.entityType.projects"
                type="checkbox"
                value="true"
              >
              <span>Projeto</span>
          </label>
        </div>
        <div class="ck-button">
          <label>
              <input
                v-model="filters.entityType.leads"
                type="checkbox"
                value="true"
              >
              <span>Lead</span>
          </label>
        </div>
      </div>
      <div>
        <div v-if="display.order" class="pl8">
          <strong>Ordenar por ordem</strong>
          <label class="custom-radio">
            Crescente
            <input
              v-model="filters.order"
              type="radio"
              name="order"
              value="asc"
            >
            <span class="custom-radio__checkmark"></span>
          </label>
          <label class="custom-radio">
            Decrescente
            <input
              v-model="filters.order"
              type="radio"
              name="order"
              value="desc"
            >
            <span class="custom-radio__checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getAllRoles from '@/services/roles';
import getAllStatus from '@/services/status';

export default {
  name: 'Filters',
  props: {
    display: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      fieldsOptions: {
        userRoles: [],
        status: [],
      },
      filters: {},
      // --- Mock
      // Ideally we would use a translation's plugin
      trl: {
        fields: {
          userRole: 'Cargo',
          entityStatus: 'Status',
        },
      },
    };
  },
  watch: {
    value: {
      handler(value) {
        this.$set(this, 'filters', value);
      },
      deep: true,
    },
    filters: {
      handler(filters) {
        this.$emit('input', filters);
      },
      deep: true,
    },
  },
  created() {
    this.$set(this, 'filters', this.value);

    if (this.display.fields && this.display.fields.length) {
      this.getFieldsOptions();
    }
  },
  methods: {
    getFieldsOptions() {
      this.loading = true;

      Promise.all([
        getAllRoles(),
        getAllStatus(),
      ])
        .then(([
          roles,
          status,
        ]) => {
          this.$set(this.fieldsOptions, 'userRole', roles);
          this.$set(this.fieldsOptions, 'entityStatus', status);
        })
        .catch((error) => {
          // Ideally we would use some error message function to signal the user
          console.error(error); // eslint-disable-line
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div label input {
  margin-right:100px;
}

body {
  font-family:sans-serif;
}

.ck-button {
  background-color:#900079;
  border: none;
  overflow:auto;
  float:left;
  color: rgba(255, 255, 255, 0.8);
}

.ck-button label {
  float:left;
  width:4.0em;
}

.ck-button label span {
  text-align:center;
  padding:3px 0px;
  display:block;
}

.ck-button label input {
  position:absolute;
  top:-20px;
}

.ck-button input:checked + span {
    background-color:#cc00ac;
    color:#FFFFFF;
}

.custom-radio {
  display: inline-block;
  position: relative;
  padding-left: 16px;
  cursor: pointer;
}

.custom-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-radio__checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 10px;
  width: 10px;
  background-color: #FFFFFF;
  border-radius: 50%;
  cursor: pointer;
}

.custom-radio:hover input ~ .custom-radio__checkmark {
  background-color: #ccc;
}

.custom-radio input:checked ~ .custom-radio__checkmark {
  background-color: #cc00ac;
}

.custom-radio__checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-radio input:checked ~ .custom-radio__checkmark:after {
  display: block;
}

.container .custom-radio__checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
