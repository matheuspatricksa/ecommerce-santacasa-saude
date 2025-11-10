import { ref } from 'vue';
import { getClients, createClient as apiCreateClient, updateClient as apiUpdateClient, deleteClient as apiDeleteClient } from '@/services/api.js';

export function useClients() {
  const clientModal = ref('');
  const temporaryEdit = ref(null);
  const clients = ref([]);

  const clientColumns = [
    { key: 'name', label: 'Nome', align: 'left' },
    { key: 'email', label: 'E-mail', align: 'left' },
    { key: 'date', label: 'Data de cadastro', align: 'left' },
    { key: 'actions', label: 'Ações', align: 'right' }
  ];

  const newClient = ref({ name: '', email: '' });

  async function loadClients() {
    const cls = await getClients();
    clients.value = cls.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      date: c.created_at ? new Date(c.created_at).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'America/Sao_Paulo'
      }) : ''
    }) );
  }

  const openEditClient = (client) => {
    temporaryEdit.value = { ...client };
    clientModal.value = 'editClient';
  };

  const submitClient = async () => {
    await apiCreateClient({ name: newClient.value.name, email: newClient.value.email });
    await loadClients();
    newClient.value = { name: '', email: '' };
    clientModal.value = '';
  };

  const editClient = async () => {
    if (!temporaryEdit.value) return;
    await apiUpdateClient({ id: temporaryEdit.value.id, name: temporaryEdit.value.name, email: temporaryEdit.value.email });
    await loadClients();
    temporaryEdit.value = null;
    clientModal.value = '';
  };

  const deleteClient = async (id) => {
    await apiDeleteClient(id);
    await loadClients();
  };

  return {
    clientModal,
    temporaryEdit,
    clients,
    clientColumns,
    newClient,
    loadClients,
    openEditClient,
    submitClient,
    editClient,
    deleteClient
  };
}
