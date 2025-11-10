import { ref } from 'vue';
import { getPurchases, createPurchase as apiCreatePurchase } from '@/services/api.js';
import { useToast } from './useToast.js';

export function usePurchases() {
  const purchaseModal = ref('');
  const purchases = ref([]);

  const { success, error } = useToast();

  const purchaseColumns = [
    { key: 'client', label: 'Cliente', align: 'left' },
    { key: 'plan', label: 'Plano', align: 'left' },
    { key: 'quantity', label: 'Quantidade', align: 'left' },
    { key: 'total', label: 'Valor total', align: 'left' },
    { key: 'date', label: 'Data da compra', align: 'left' }
  ];

  const newPurchase = ref({ client: null, plan: null, quantity: 1 });
  const selectedClient = ref(null);
  const selectedPlan = ref(null);
  const showClientDropdown = ref(false);
  const showPlanDropdown = ref(false);

  async function loadPurchases() {
    try {
      const pchs = await getPurchases();
      purchases.value = pchs.map(item => ({
      id: item.id,
      client: item.client_name,
      email: item.client_email,
      plan: item.plan_name,
      quantity: item.quantity,
      total: Number(item.plan_price) * Number(item.quantity),
      date: item.purchase_date ? new Date(item.purchase_date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      }) : ''
    }));
    } catch (err) {
      console.error(err);
      error('Erro ao carregar compras.');
    }
  }

  const selectClient = (client) => {
    selectedClient.value = client;
    showClientDropdown.value = false;
  };

  const selectPlan = (plan) => {
    selectedPlan.value = plan;
    showPlanDropdown.value = false;
  };

  const submitPurchase = async () => {
    try {
      if (!selectedClient.value || !selectedPlan.value) {
        error('Selecione cliente e plano antes de finalizar a compra.');
        return;
      }
      await apiCreatePurchase({ client_id: selectedClient.value.id, plan_id: selectedPlan.value.id, quantity: Number(newPurchase.value.quantity) || 1 });
      await loadPurchases();
      newPurchase.value = { client: null, plan: null, quantity: 1 };
      selectedClient.value = null;
      selectedPlan.value = null;
      purchaseModal.value = '';
      success('Compra registrada com sucesso!');
    } catch (err) {
      console.error(err);
      error('Erro ao processar a compra. Tente novamente.');
    }
  };

  return {
    purchaseModal,
    purchases,
    purchaseColumns,
    newPurchase,
    selectedClient,
    selectedPlan,
    showClientDropdown,
    showPlanDropdown,
    loadPurchases,
    selectClient,
    selectPlan,
    submitPurchase
  };
}
