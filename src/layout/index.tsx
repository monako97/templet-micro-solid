import { For } from 'solid-js';
import { locales, setLang } from '@app/locales';
import routes, { RouteConfig } from '@app/routes';
import { Outlet, useNavigate } from '@moneko/solid';
import styles from './index.less';
import '@/global.less';

type AllRoute = {
  path: string;
  meta?: RouteConfig['meta'];
};

function transformRoutes(inputRoutes: RouteConfig[], parentPath?: string, result: AllRoute[] = []) {
  for (const route of inputRoutes) {
    const { path, meta, children } = route;
    const fullPath = [parentPath, path].join('/').split('/').filter(Boolean).join('/');
    const transformedRoute: AllRoute = { path: fullPath, meta };

    if (children) {
      transformRoutes(children, fullPath, result);
    } else {
      result.push(transformedRoute);
    }
  }

  return result;
}

function App() {
  const all = transformRoutes(routes);
  const navigate = useNavigate();

  return (
    <div>
      <p>
        跳转路由:
        <For each={all}>
          {(item) => {
            return (
              <button
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {[item.path || '/', item.meta?.title].filter(Boolean)}
              </button>
            );
          }}
        </For>
      </p>
      <p>
        切换语言:
        <For each={locales}>
          {(item) => {
            return (
              <button
                onClick={() => {
                  setLang(item.language);
                }}
              >
                {item.title}
              </button>
            );
          }}
        </For>
      </p>
      <main class={styles.main}>
        路由页面:
        <Outlet />
      </main>
    </div>
  );
}

export default App;
