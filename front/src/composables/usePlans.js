import { ref } from 'vue';
import { getPlans, createPlan as apiCreatePlan, updatePlan as apiUpdatePlan, deletePlan as apiDeletePlan } from '@/services/api.js';

export function usePlans() {
  const planModal = ref('');
  const temporaryEdit = ref(null);
  const plansAvailable = ref([]);

  const planColumns = [
    { key: 'name', label: 'Nome do plano', align: 'left' },
    { key: 'description', label: 'Descrição', align: 'left' },
    { key: 'price', label: 'Preço', align: 'left' },
    { key: 'date', label: 'Data de cadastro', align: 'left' },
    { key: 'actions', label: 'Ações', align: 'right' }
  ];

  const newPlan = ref({ name: '', price: '', description: '' });

  async function loadPlans() {
    const plans = await getPlans();
    plansAvailable.value = plans.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      date: '-'
    }));
  }

  const openEditPlan = (plan) => {
    temporaryEdit.value = { ...plan };
    planModal.value = 'editPlan';
  };

  const submitPlan = async () => {
    await apiCreatePlan({ name: newPlan.value.name, price: Number(newPlan.value.price), description: newPlan.value.description });
    await loadPlans();
    newPlan.value = { name: '', price: '', description: '' };
    planModal.value = '';
  };

  const editPlan = async () => {
    if (!temporaryEdit.value) return;
    await apiUpdatePlan({ id: temporaryEdit.value.id, name: temporaryEdit.value.name, price: Number(temporaryEdit.value.price), description: temporaryEdit.value.description });
    await loadPlans();
    temporaryEdit.value = null;
    planModal.value = '';
  };

  const deletePlan = async (id) => {
    await apiDeletePlan(id);
    await loadPlans();
  };

  return {
    planModal,
    temporaryEdit,
    plansAvailable,
    planColumns,
    newPlan,
    loadPlans,
    openEditPlan,
    submitPlan,
    editPlan,
    deletePlan
  };
}
