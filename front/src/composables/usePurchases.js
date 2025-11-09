import { ref } from 'vue';
import { getPurchases, createPurchase as apiCreatePurchase } from '@/services/api.js';

export function usePurchases() {
  const purchaseModal = ref('');
  const purchases = ref([]);

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
    const pchs = await getPurchases();
    purchases.value = pchs.map(item => ({
      id: item.id,
      client: item.client_name,
      email: item.client_email,
      plan: item.plan_name,
      quantity: item.quantity,
      total: Number(item.plan_price) * Number(item.quantity),
      date: new Date(item.purchase_date).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }));
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
    if (!selectedClient.value || !selectedPlan.value) throw new Error('Selecione cliente e plano');
    await apiCreatePurchase({ client_id: selectedClient.value.id, plan_id: selectedPlan.value.id, quantity: Number(newPurchase.value.quantity) || 1 });
    await loadPurchases();
    newPurchase.value = { client: null, plan: null, quantity: 1 };
    selectedClient.value = null;
    selectedPlan.value = null;
    purchaseModal.value = '';
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
