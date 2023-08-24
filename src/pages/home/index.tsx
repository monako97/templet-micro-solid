import { createResource } from 'solid-js';
import { t } from '@app/locales';
import { fetchHitokoto } from '@/services/hitokoto';

function Home() {
  const [data, { refetch }] = createResource(fetchHitokoto);

  return (
    <div>
      <h4>
        {t.hitokoto}:<button onClick={refetch}>{t.refetch}</button>
      </h4>
      <pre>
        <code>{JSON.stringify(data(), null, 2)}</code>
      </pre>
    </div>
  );
}

export default Home;
