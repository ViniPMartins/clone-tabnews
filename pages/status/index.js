import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div>
      <h1>Status</h1>
      <UpdateAt />
      <DatabaseInfo />
    </div>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInfoText = {
    UpdateAtText: "Carregando...",
  };

  if (!isLoading && data) {
    databaseInfoText.UpdateAtText = new Date(data.update_at).toLocaleString(
      "pt-BR",
    );
  }

  return (
    <div>
      <div>Última Atualização: {databaseInfoText.UpdateAtText}</div>
    </div>
  );
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInfoText = "Carregando...";

  if (!isLoading && data) {
    const databaseData = data.dependencies.database;
    databaseInfoText = (
      <div>
        <div>Versão do Banco de Dados: {databaseData.version}</div>
        <div>Número máximo de conexões: {databaseData.max_connections}</div>
        <div>Conexôes Abertas: {databaseData.opened_connections}</div>
      </div>
    );
  }

  return (
    <div>
      <h2>Banco de Dados</h2>
      {databaseInfoText}
    </div>
  );
}
