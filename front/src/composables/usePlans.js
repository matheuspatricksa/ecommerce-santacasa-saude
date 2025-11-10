import { ref } from 'vue';
import { getPlans, createPlan as apiCreatePlan, updatePlan as apiUpdatePlan, deletePlan as apiDeletePlan } from '@/services/api.js';
import { useToast } from './useToast.js';

export function usePlans() {
  const planModal = ref('');
  const temporaryEdit = ref(null);
  const plansAvailable = ref([]);

  const { success, error } = useToast();

  const planColumns = [
    { key: 'name', label: 'Nome do plano', align: 'left' },
    { key: 'description', label: 'Descrição', align: 'left' },
    { key: 'price', label: 'Preço', align: 'left' },
    { key: 'date', label: 'Data de cadastro', align: 'left' },
    { key: 'actions', label: 'Ações', align: 'right' }
  ];

  const newPlan = ref({ name: '', price: '', description: '' });

  async function loadPlans() {
    try {
      const plans = await getPlans();
      plansAvailable.value = plans.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      date: p.created_at ? new Date(p.created_at).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'America/Sao_Paulo'
      }) : ''
    }));
    } catch (err) {
      console.error(err);
      error('Erro ao carregar planos.');
    }
  }

  const openEditPlan = (plan) => {
    temporaryEdit.value = { ...plan };
    planModal.value = 'editPlan';
  };

  const submitPlan = async () => {
    try {
      await apiCreatePlan({ name: newPlan.value.name, price: Number(newPlan.value.price), description: newPlan.value.description });
      await loadPlans();
      newPlan.value = { name: '', price: '', description: '' };
      planModal.value = '';
      success('Plano criado com sucesso!');
    } catch (err) {
      console.error(err);
      error('Erro ao criar plano.');
    }
  };

  const editPlan = async () => {
    if (!temporaryEdit.value) return;
    try {
      await apiUpdatePlan({ id: temporaryEdit.value.id, name: temporaryEdit.value.name, price: Number(temporaryEdit.value.price), description: temporaryEdit.value.description });
      await loadPlans();
      temporaryEdit.value = null;
      planModal.value = '';
      success('Plano atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      error('Erro ao atualizar plano.');
    }
  };

  const deletePlan = async (id) => {
    try {
      await apiDeletePlan(id);
      await loadPlans();
      success('Plano deletado com sucesso!');
    } catch (err) {
      console.error(err);
      error('Erro ao deletar plano.');
    }
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
