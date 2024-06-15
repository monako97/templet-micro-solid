import * as styles from './index.less';
import { For } from 'solid-js';
import { locales, setLang, t } from '@app/locales';
import routes, { RouteConfig } from '@app/routes';
import { type RouteProps, useNavigate } from '@moneko/solid';

// 纯演示用的无关代码: 将路由转换成按钮数据
function transformRoutes(
  inputRoutes: RouteConfig[],
  parentPath?: string,
  result: RouteConfig[] = [],
) {
  for (const route of inputRoutes) {
    const { path, metadata, children } = route;
    const fullPath = [parentPath, path].join('/').split('/').filter(Boolean).join('/');
    const transformedRoute: RouteConfig = { path: fullPath, metadata };

    if (children) {
      transformRoutes(children, fullPath, result);
    } else {
      result.push(transformedRoute);
    }
  }
  return result;
}

function App(p: RouteProps<string>) {
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
                {[item.path || '/', t[item.metadata?.title.toString() || '']]
                  .filter(Boolean)
                  .join(': ')}
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
        {t.outlet}:{p.children}
      </main>
    </div>
  );
}

export default App;
