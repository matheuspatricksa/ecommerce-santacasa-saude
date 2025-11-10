import { ref } from 'vue';
import { getClients, createClient as apiCreateClient, updateClient as apiUpdateClient, deleteClient as apiDeleteClient } from '@/services/api.js';
import { useToast } from './useToast.js';

export function useClients() {
  const clientModal = ref('');
  const temporaryEdit = ref(null);
  const clients = ref([]);

  const { success, error } = useToast();

  const clientColumns = [
    { key: 'name', label: 'Nome', align: 'left' },
    { key: 'email', label: 'E-mail', align: 'left' },
    { key: 'date', label: 'Data de cadastro', align: 'left' },
    { key: 'actions', label: 'Ações', align: 'right' }
  ];

  const newClient = ref({ name: '', email: '' });

  async function loadClients() {
    const cls = await getClients();
    try {
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
    } catch (err) {
      console.error(err);
      error('Erro ao carregar clientes.');
    }
  }

  const openEditClient = (client) => {
    temporaryEdit.value = { ...client };
    clientModal.value = 'editClient';
  };

  const submitClient = async () => {
    try {
      await apiCreateClient({ name: newClient.value.name, email: newClient.value.email });
      await loadClients();
      newClient.value = { name: '', email: '' };
      clientModal.value = '';
      success('Cliente criado com sucesso!', { timeout: 4000 });
    } catch (err) {
      console.error(err);
      error('Erro ao criar cliente. Verifique os dados e tente novamente.');
    }
  };

  const editClient = async () => {
    if (!temporaryEdit.value) return;
    try {
      await apiUpdateClient({ id: temporaryEdit.value.id, name: temporaryEdit.value.name, email: temporaryEdit.value.email });
      await loadClients();
      temporaryEdit.value = null;
      clientModal.value = '';
      success('Cliente atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      error('Erro ao atualizar cliente.');
    }
  };

  const deleteClient = async (id) => {
    try {
      await apiDeleteClient(id);
      await loadClients();
      success('Cliente deletado com sucesso!');
    } catch (err) {
      console.error(err);
      error('Erro ao deletar cliente.');
    }
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
