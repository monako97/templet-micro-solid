import { t } from '@app/locales';
import { useNavigate, useParams } from '@moneko/solid';

function User() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      {t['user/:id']}
      <button onClick={() => navigate('csasa?menuId=user/:id')}>跳转到下一个子路由</button>
      <pre>
        <code>{JSON.stringify(params, null, 2)}</code>
      </pre>
    </div>
  );
}

export default User;
