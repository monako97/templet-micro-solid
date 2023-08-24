import { t } from '@app/locales';
import { useParams } from '@moneko/solid';

function UserState() {
  const params = useParams();

  return (
    <div>
      {t['user/:id/:state']}
      <pre>
        <code>{JSON.stringify(params, null, 2)}</code>
      </pre>
    </div>
  );
}

export default UserState;
