import { For } from 'solid-js';
import { locales, setLang, t } from '@app/locales';
import routes, { RouteConfig } from '@app/routes';
import { type RouteProps, useNavigate } from '@moneko/solid';
import styles from './index.less';

type AllRoute = {
  path: string;
  metadata?: RouteConfig['metadata'];
};

function transformRoutes(inputRoutes: RouteConfig[], parentPath?: string, result: AllRoute[] = []) {
  for (const route of inputRoutes) {
    const { path, metadata, children } = route;
    const fullPath = [parentPath, path].join('/').split('/').filter(Boolean).join('/');
    const transformedRoute: AllRoute = { path: fullPath, metadata };

    if (children) {
      transformRoutes(children, fullPath, result);
    } else {
      result.push(transformedRoute);
    }
  }

  return result;
}

function App(p: RouteProps<setLang>) {
  const all = transformRoutes(routes);
  const navigate = useNavigate();

  return (
    <div>
      <p>
        {t.go}:
        <For each={all}>
          {(item) => {
            return (
              <button
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {[item.path || '/', item.metadata?.title].filter(Boolean)}
              </button>
            );
          }}
        </For>
      </p>
      <p>
        {t.lang}:
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
        {t.outlet}:
        {p.children}
      </main>
    </div>
  );
}

export default App;
